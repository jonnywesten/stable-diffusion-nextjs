'use client'

import {callGenerate} from './actions'
import React from "react";
import ImageComponent from "@/app/components/image";
import LoadingSpinnerComponent from "@/app/components/loading-spinner";

export default function Home() {
    const [prompt, setPrompt] = React.useState<string | null>()
    const [image, setImage] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!loading || !prompt) return

        callGenerate(prompt)
            .then((response) => {
                setImage(response?.output)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [loading])

    const onSubmit = async () => {
        setLoading(true)
        setImage(null)
    }

    return (
        <>
            <LoadingSpinnerComponent loading={loading}/>
            <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">NextJS </span>Stable
                    diffusion</h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-12 max-w-[700px]">Turn
                    words into visual
                    wonders! Enter a prompt, and let Imaginify transform it into a unique piece of art using the Stable
                    Diffusion API. Unleash your creativity now!</p>

                <ImageComponent image={image}/>

                <form action={onSubmit as unknown as undefined} className="w-2/3 max-w-lg mt-8">
                    <div className="mb-5">
                                <textarea id="message" rows={4}
                                          value={prompt || ""}
                                          onChange={(e) => setPrompt(e.target.value)}
                                          className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50
                                          rounded-lg border border-gray-200 focus:ring-4 focus:ring-gray-200"
                                          placeholder="Enter an image description..." required></textarea>
                    </div>
                    <button type="submit"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none
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
