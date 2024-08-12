'use client'
import React, { useEffect, useState } from 'react'
import images from './constants/images'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './Loader'
export default function Page() {
    const [ytlink, setytLink] = useState('')
    const [showFrame, setShowFrame] = useState(false)
    const [format, setFormat] = useState('')
    const [loader, setLoader] = useState(false)

    function handleBlur(event: any, value: string) {
        // Extract the video ID from the YouTube URL
        const videoID = value.split('v=')[1]?.split('&')[0] // Handles additional query parameters
        // Create the embed URL
        if (videoID === undefined) return null
        const embedUrl = `https://www.youtube.com/embed/${videoID}`
        setytLink(embedUrl)
        setShowFrame(true)
    }

    const handleClick = (e: any, format: string) => {
        e.preventDefault()
        if (format === 'audio') {
            setFormat('audio')
        } else if (format === 'video') {
            setFormat('video')
        } else return
        handleDownload()
    }

    const handleDownload = async () => {
        try {
            setLoader(true)
            const response = await fetch(
                `./api/download?url=${encodeURIComponent(ytlink)}&format=${encodeURIComponent(format)}`
            )
            const data = await response.json()
            if (response.ok) {
                setLoader(false)
                toast.success('Download Finished')
            } else {
                alert('Error: ' + data.error)
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
                            <button
                                className={`rounded px-6 py-3 font-extrabold tracking-wide text-fouriondary focus:outline-none ${loader ? 'bg-secondary opacity-85' : 'bg-secondary ring ring-primary hover:bg-fouriondary hover:text-primary focus:ring-fouriondary'}`}
                                onClick={(e) => handleClick(e, 'video')}
                                disabled={loader}
                            >
                                {loader ? <Loader /> : 'Download Video'}
                            </button>
                            <button
                                className={`rounded px-6 py-3 font-extrabold tracking-wide text-fouriondary focus:outline-none ${loader ? 'bg-secondary opacity-85' : 'bg-secondary ring ring-primary hover:bg-fouriondary hover:text-primary focus:ring-fouriondary'}`}
                                onClick={(e) => handleClick(e, 'video')}
                                disabled={loader}
                            >
                                {loader ? <Loader /> : 'Download Audio'}
                            </button>
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
