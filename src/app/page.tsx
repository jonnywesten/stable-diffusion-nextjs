'use client'

import {callGenerate} from './actions'
import React from "react";
import ImageComponent from "@/app/components/image";
import LoadingSpinnerComponent from "@/app/components/loading-spinner";
import ThemeToggle from "@/app/components/theme-toggle";
import AlertComponent from "@/app/components/alert";

export default function Home() {
    const [prompt, setPrompt] = React.useState<string | null>()
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>()
    const [image, setImage] = React.useState<string | undefined>()
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!loading || !prompt) return

        // calling experimental actions within onSubmit doesn't work yet
        callGenerate(prompt)
            .then((response) => {
                setImage(response)
            })
            .catch((err) => {
                setErrorMessage(err.message)
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [loading])

    const onSubmit = async () => {
        setLoading(true)
        setImage(undefined)
        setErrorMessage(undefined)
    }

    return (
        <>
            <LoadingSpinnerComponent loading={loading}/>
            <ThemeToggle/>
            <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pr-12 sm:pr-0"><span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">NextJS </span>Stable
                    Diffusion</h1>
                <p className="text-lg mt-2 text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-12 max-w-[700px]">Turn
                    words into visual wonders! Enter a prompt and transform it into a unique piece of art using the
                    Stable Diffusion API. Unleash your creativity now!</p>

                <AlertComponent message={errorMessage}/>
                <ImageComponent image={image}/>

                <form action={onSubmit as unknown as undefined} className="w-full max-w-lg mt-8">
                    <textarea id="message" rows={4}
                              value={prompt || ""}
                              onChange={(e) => setPrompt(e.target.value)}
                              className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50
                                          rounded-lg border border-gray-200 focus:ring-4 focus:ring-gray-200
                                          dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-100
                            dark:border-gray-600"
                              placeholder="Enter an image description..." required></textarea>
                    <button type="submit"
                            className="shadow-md w-full py-2.5 mt-5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none
                            bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4
                            focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400
                            dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Generate Image
                    </button>
                </form>
            </main>
        </>
    )
}
