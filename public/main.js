const path = require("path")
const fs = require("fs")

const dirTitlePath = path.join(__dirname, "../src/info/title")
const dirSubtitlePath = path.join(__dirname, "../src/info/subtitle")
const dirInformationPath = path.join(__dirname, "../src/info/information")
let titlelist = []
let subtitlelist = []
let informationList = []

const getTitles = () => {
    fs.readdir(dirTitlePath, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }
        let ilist = []
        files.forEach((file, i) => {
            let obj = {}
            let post
            fs.readFile(`${dirTitlePath}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                const date = new Date()
                const timestamp = date.getTime() / 1000
                post = {
                    id: timestamp,
                    title: metadata.title ? metadata.title : "No title given",
                    icon: metadata.icon ? metadata.icon : null,
                    urltitle: metadata.urltitle
                }
                titlelist.push(post)
                ilist.push(i)
                if (ilist.length === files.length) {
                    const sortedList = titlelist.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/infoJson/titles.json", data)
                }
            })
        })
    })
    return
}
const getSubtitles = () => {
    fs.readdir(dirSubtitlePath, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }
        let ilist = []
        files.forEach((file, i) => {
            let obj = {}
            let post
            fs.readFile(`${dirSubtitlePath}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                const date = new Date()
                const timestamp = date.getTime() / 1000
                post = {
                    id: timestamp,
                    title: metadata.title,
                    icon: metadata.icon ? metadata.icon : null,
                    urltitle: metadata.urltitle,
                    subtitle: metadata.subtitle,
                    urlsubtitle: metadata.urlsubtitle,
                    country: metadata.country
                }
                subtitlelist.push(post)
                ilist.push(i)
                if (ilist.length === files.length) {
                    const sortedList = subtitlelist.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/infoJson/subtitles.json", data)
                }
            })
        })
    })
    return
}

const getInformation = () => {
    fs.readdir(dirInformationPath, (err, files) => {
        if (err) {
            return console.log("Failed to list contents of directory: " + err)
        }
        let ilist = []
        files.forEach((file, i) => {
            let obj = {}
            let post
            fs.readFile(`${dirInformationPath}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const parseContent = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        lines = lines.slice(metadataIndices[1] + 1, lines.length)
                    }
                    return lines.join("\n")
                }
                const lines = contents.split("\n")
                const metadataIndices = lines.reduce(getMetadataIndices, [])
                const metadata = parseMetadata({lines, metadataIndices})
                const content = parseContent({lines, metadataIndices})
                const date = new Date()
                const timestamp = date.getTime() / 1000
                post = {
                    id: timestamp,
                    subtitle: metadata.subtitle,
                    urlsubtitle: metadata.urlsubtitle,
                    country: metadata.country,
                    imageOne: metadata.imageOne ? metadata.imageOne : null,
                    imageTwo: metadata.imageTwo ? metadata.imageTwo : null,
                    imageThree: metadata.imageThree ? metadata.imageThree : null,
                    imageFour: metadata.imageFour ? metadata.imageFour : null,
                    content: content ? content : "No content given",
                }
                informationList.push(post)
                ilist.push(i)
                if (ilist.length === files.length) {
                    const sortedList = informationList.sort ((a, b) => {
                        return a.id < b.id ? 1 : -1
                    })
                    let data = JSON.stringify(sortedList)
                    fs.writeFileSync("src/infoJson/information.json", data)
                }
            })
        })
    })
    return
}

getTitles()
getSubtitles()
getInformation()