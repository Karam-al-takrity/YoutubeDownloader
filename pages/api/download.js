import { exec } from 'child_process'
import path from 'path'

export default function handler(req, res) {
    const { url, format, resolution } = req.query

    if (!url) {
        return res.status(400).json({ error: 'No URL provided' })
    }

    const downloadDir = path.join(process.cwd(), 'downloads')

    const outputTemplate = path.join(downloadDir, '%(title)s.%(ext)s')

    const command = !format
        ? ''
        : format === 'audio'
          ? `yt-dlp -x --audio-format mp3 "${url}" -o "${outputTemplate}"`
          : format === 'video'
            ? `yt-dlp ${resolution ? `-S ${resolution} ` : ''} "${url}" -o "${outputTemplate}"`
            : format === 'format'
              ? `yt-dlp -F "${url}"`
              : ''
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return res.status(500).json({ error: stderr })
        }

        const output = stdout.toString()

        res.status(200).json({
            message: 'labosi',
            output: output,
            error: stderr,
        })
    })
}
