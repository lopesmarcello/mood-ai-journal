'use client'

import { HelpCircle } from "lucide-react"
import ButtonTooltip from "./ButtonTooltip"
import { Button } from "./ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

const AskQuestionButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const createUrl = (name: string, value: string) => {
        router.push(pathname + "?" + createQueryString(name, value))
    }

    const handleClick = () => {
        const questionParam = searchParams.get('question')
        switch (questionParam) {
            case "true": {
                createUrl('question', 'false')
                break;
            }

            case "false": {
                createUrl('question', 'true')
                break;
            }

            default: {
                createUrl('question', 'true')
                break;
            }

        }
    }

    return (
        <Button
            onClick={handleClick}
            className='bg-indigo-100 text-indigo-300 hover:bg-indigo-300 hover:text-indigo-400 dark:bg-zinc-700 hover:dark:bg-indigo-100 dark:text-indigo-300 hover:dark:text-zinc-800'>
            <HelpCircle />
        </Button>
    )
}

export default AskQuestionButton