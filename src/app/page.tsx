'use client'

import {callGenerate} from './actions'
import React from "react";

export default function Home() {
    const [prompt, setPrompt] = React.useState("")
    const [image, setImage] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!loading) return
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
            {loading &&
                (<div className="fixed bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                    <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
                </div>)}
            <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
                    className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">NextJS </span>Stable
                    diffusion</h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-12 max-w-[700px]">Turn
                    words into visual
                    wonders! Enter a prompt, and let Imaginify transform it into a unique piece of art using the Stable
                    Diffusion API. Unleash your creativity now!</p>

                {image ? <img src={image} width={512}/> :
                    (<div role="status"
                          className="space-y-8 animate-pulse space-y-0 space-x-8 flex items-center w-[100%] max-w-[512px]">
                            <div
                                className="flex relative items-center justify-center pb-[100%] bg-gray-300 rounded w-[100%] dark:bg-gray-700">
                                <svg className="absolute left-[calc(50%_-_1.25rem)] top-[calc(50%_-_1.25rem)] w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path
                                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                    )}
                <form action={onSubmit as unknown as undefined} className="w-2/3 max-w-lg mt-8">
                    <div className="mb-5">
                                <textarea id="message" rows={4}
                                          value={prompt}
                                          onChange={(e) => setPrompt(e.target.value)}
                                          className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-4 focus:ring-gray-200"
                                          placeholder="Enter an image description..." required></textarea>
                    </div>
                    <button type="submit"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Generate Image
                    </button>
                </form>
            </main>
        </>
    )
}
