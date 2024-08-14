'use client'
import React, { useEffect, useState } from 'react'
import images from './constants/images'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './Loader'
import DropdownList from './DropdownList'
// import DataShape from './DataShape'

export default function Page() {
    const [ytlink, setytLink] = useState('')
    const [showFrame, setShowFrame] = useState(false)
    const [format, setFormat] = useState('')
    const [loader, setLoader] = useState(false)
    const [output, setOutput] = useState(null)
    const [resolution, setResolution] = useState('')

    function handleBlur(eventany, value) {
        // Extract the video ID from the YouTube URL
        const videoID = value.split('v=')[1]?.split('&')[0] // Handles additional query parameters
        // Create the embed URL
        if (videoID === undefined) return null
        const embedUrl = `https://www.youtube.com/embed/${videoID}`
        setytLink(embedUrl)
        setShowFrame(true)
    }

    const handleClick = (e, format) => {
        e.preventDefault()
        if (format === 'audio') {
            setFormat('audio')
        } else if (format === 'video') {
            setFormat('video')
        } else if (format === 'format') {
            setFormat('format')
        } else return
        handleDownload()
    }

    const handleDownload = async () => {
        let msg = 'Action started'
        if (format === 'audio') {
            msg = 'Audio download started'
        } else if (format === 'video') {
            msg = `Video download started`
        } else if (format === 'format') {
            msg = 'Format list retrieved'
        }
        toast.info(msg)
        console.log(msg)
        try {
            setLoader(true)
            const response = await fetch(
                `./api/download?url=${encodeURIComponent(ytlink)}&format=${encodeURIComponent(format)}&resolution=${encodeURIComponent(resolution)}`
            )

            const data = await response.json()
            const Output = data.output

            if (response.ok) {
                setLoader(false)
                setOutput(Output)
                let toastMessage = ''
                if (format === 'audio') {
                    toastMessage = 'Audio download finished'
                } else if (format === 'video') {
                    toastMessage = `Video download finished`
                } else if (format === 'format') {
                    toastMessage = 'Format list retrieved'
                } else {
                    toastMessage = 'Action finished'
                }

                toast.success(toastMessage)
            }
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    useEffect(() => {
        if (format) {
            handleDownload()
        }
    }, [format])

    return (
        <div>
            <div className="min-h-screen bg-primary text-fouriondary">
                <div className="text-s flex items-center justify-center gap-10 bg-secondary py-8 text-center font-Monoton sm:text-6xl">
                    <h1 className="w-[40%]">
                        Welcome To The Labosian Downloader
                    </h1>
                </div>
                <div>
                    <form className="flex flex-col items-center">
                        <span className="my-8 text-4xl font-extrabold">
                            Enter Your Link Now
                        </span>
                        <input
                            className="focus: my-6 h-6 w-[30%] rounded bg-secondary px-2 py-6 placeholder-fouriondary outline-none ring-fouriondary focus:ring"
                            type="text"
                            placeholder="Enter YouTube Video Link"
                            value={ytlink}
                            onChange={(e) => {
                                setytLink(e.target.value)
                            }}
                            onBlur={(event) => {
                                handleBlur(event, ytlink)
                            }}
                        />
                        <div className="mb-4">
                            {showFrame && (
                                <iframe
                                    className={showFrame ? 'block' : 'hidden'}
                                    width="560"
                                    height="315"
                                    src={ytlink}
                                ></iframe>
                            )}
                        </div>
                        <div className="flex w-[30%] flex-row justify-around">
                            {loader ? (
                                <Loader />
                            ) : (
                                <>
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="flex flex-row gap-6">
                                            {/* {format && ( */}
                                            <div className="flex flex-col items-center gap-6">
                                                <button
                                                    className="rounded bg-secondary px-6 py-3 font-extrabold tracking-wide text-fouriondary ring ring-primary hover:bg-fouriondary hover:text-primary focus:outline-none focus:ring-fouriondary"
                                                    onClick={(e) =>
                                                        handleClick(e, 'video')
                                                    }
                                                >
                                                    Download Video
                                                </button>
                                            </div>
                                            {/* )} */}
                                            <div className="flex flex-col items-center gap-6">
                                                <button
                                                    className="rounded bg-secondary px-6 py-3 font-extrabold tracking-wide text-fouriondary ring ring-primary hover:bg-fouriondary hover:text-primary focus:outline-none focus:ring-fouriondary"
                                                    onClick={(e) =>
                                                        handleClick(e, 'format')
                                                    }
                                                >
                                                    Format
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-center gap-6">
                                                <button
                                                    className="rounded bg-secondary px-6 py-3 font-extrabold tracking-wide text-fouriondary ring ring-primary hover:bg-fouriondary hover:text-primary focus:outline-none focus:ring-fouriondary"
                                                    onClick={(e) =>
                                                        handleClick(e, 'audio')
                                                    }
                                                >
                                                    Download Audio
                                                </button>
                                            </div>
                                        </div>
                                        <div className="">
                                            {output && (
                                                <DropdownList
                                                    data={output}
                                                    setResolution={
                                                        setResolution
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                    <ToastContainer autoClose={1500} stacked closeOnClick />
                </div>
            </div>
            <footer className="flex min-h-16 flex-row justify-center bg-secondary text-fouriondary">
                <div className="mt-4 flex w-full flex-row justify-around">
                    <Link href="https://www.youtube.com/" target="_blank">
                        <Image src={images.youtube} alt="youtube" />
                    </Link>
                    <Link
                        href="https://github.com/yt-dlp/yt-dlp"
                        target="_blank"
                    >
                        <Image src={images.download} alt="yt-dlp" />
                    </Link>
                </div>
            </footer>
        </div>
    )
}
