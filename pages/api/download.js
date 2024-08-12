import { exec } from 'child_process'
import path from 'path'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function handler(req, res) {
    const { url, format } = req.query
    console.log(req.query)

    console.log(format)

    if (!url) {
        return res.status(400).json({ error: 'No URL provided' })
    }

    // Define the directory where you want to save the downloaded files
    const downloadDir = path.join(process.cwd(), 'downloads')

    // Define the output format (optional, this example uses the title of the video and its extension)
    const outputTemplate = path.join(downloadDir, '%(title)s.%(ext)s')

    // Construct the yt-dlp command with the output directory

    // toast.info('Download Started')
    // ;<ToastContainer autoClose={1500} stacked closeOnClick />

    // const command = `yt-dlp -x --audio-format mp3 "${url}" -o "${outputTemplate}"`

    const command = !format
        ? ''
        : format === 'audio'
          ? `yt-dlp -x --audio-format mp3 "${url}" -o "${outputTemplate}"`
          : format === 'video'
            ? `yt-dlp "${url}" -o "${outputTemplate}"`
            : ''

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return res.status(500).json({ error: 'Failed to download video' })
        }

        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        res.status(200).json({ message: 'Download started', output: stdout })
    })
}
