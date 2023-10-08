'use client'
import { FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { askQuestion } from '@/utils/api'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const answer = await askQuestion(question)
    setResponse(answer)
    setQuestion('')
    setIsLoading(false)
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="flex gap-4">
        <Input
          disabled={isLoading}
          name="question"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-indigo-800 hover:bg-indigo-600 transition-all dark:bg-indigo-300"
          disabled={isLoading}
        >
          Ask
        </Button>
      </form>
      {isLoading && <p>loading..</p>}
      {response && response}
    </>
  )
}
export default Question
