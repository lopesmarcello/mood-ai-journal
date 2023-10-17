'use client'

import { FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { askQuestion } from '@/utils/api'
import { useSearchParams } from 'next/navigation'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')

  const searchParams = useSearchParams()

  const isVisible = searchParams.get('question') === 'true'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const answer = await askQuestion(question)
    setResponse(answer)
    setQuestion('')
    setIsLoading(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div className='p-3 w-full bg-amber-500/25 border border-amber-100/25 rounded-lg my-5'>
        <p className='font-bold text-sm'>Warning</p>
        <p className='prose-xs text-xs'>This feature is still in tests and might have incorrect results. To have better experience, we recommend you to be honest in your journal entries and in your questions. As you fill the journal with more content, the application should have better context of what is happening to answer your questions. This is a slow and heavy feature, use it with counsciouness. {'<3'}
        </p>
      </div>
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
