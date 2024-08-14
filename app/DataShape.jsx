export default function DataShape(data) {
    console.log(data)
    let x = data.match('625')
    let x1 = data.match('620')
    let x2 = data.match('614')
    let x3 = data.match('609')
    let x4 = data.match('606')

    // Create an object with all the resolutions
    const resolutions = {
        '4K': { id: '625', match: x ? x[0] : null },
        QHD: { id: '620', match: x1 ? x1[0] : null }, // 1440p
        FHD: { id: '614', match: x2 ? x2[0] : null }, // 1080p
        HD_720p: { id: '609', match: x3 ? x3[0] : null }, // 720p
        HD_480p: { id: '606', match: x4 ? x4[0] : null }, // 480p
    }

    // Log the object
    console.log(resolutions)

    return resolutions
}
