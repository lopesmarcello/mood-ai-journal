import { OpenAI } from 'langchain/llms/openai'
import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'
import { JournalEntry } from '@prisma/client'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe(
        'The mood of the person who wrote the journal entry. It must match the language of the journal entry (english or brazilian portuguese), no matter what!'
      ),
    summary: z
      .string()
      .describe(
        'Quick summary of the entire entry. Must be one sentence long and should match the language of the Journal Entry. Example: "You were happy with your work today." or "Hoje você ficou feliz com sua produtividade".'
      ),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?). Respond "true" or "false"'
      ),
    subject: z
      .string()
      .describe(
        'The subject of the journal entry. Example: "Beach trip" or "Dia produtivo no trabalho". It must match the language of the journal entry.'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    emoji: z
      .string()
      .describe(
        'a emoji that represents the mood of the entry. Example: 🏖️ for a beach day or 😡 for a day that had an argument'
      ),
    sentimentScore: z
      .string()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry, which its language will be in brazilian portuguese or english. Follow the instructions and format your response to match the format instructions and the journal entry respective language (English or Portuguese), no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyzeEntry = async (entry: string) => {
  const input = await getPrompt(entry)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const output = await model.call(input)

  try {
    return parser.parse(output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
      parser
    )
    const fix = await fixParser.parse(output)
    return fix
  }
}

type ShortenEntry = {
  id: string
  content: string
  createdAt: Date
}

export const qa = async (question: string, entries: ShortenEntry[]) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
