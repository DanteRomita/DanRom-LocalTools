//--BEGINNING OF APP INITIALIZATIONS--//

const express = require(`express`);
const app = express();
const fs = require(`fs`);

app.set(`view engine`, `ejs`)
app.use(`/images/`, express.static(`./images`))
app.use(express.urlencoded({ extended: true }));

//--END OF APP INITIALIZATIONS--//

//--BEGINNING OF VARIABLE INITIALIZATIONS--//

const finalLine = `\necho 'COMPLETE!'`

//-----Path Constants-----//

const YTDLP_Path = `___YT-DLP`
const LoopMedia_Path = `_LoopMedia`
const ReverseMedia_Path = `_ReverseMedia`
const ReduceMedia_Path = `_ReduceMediaDimensions`
const ListedFilesInFolder_Path = `_ListedFilesInFolder`
const ListSubFolders_Path = `_ListSubFolders`
const ReduceFPS_Path = `_ReduceFPS`
const ScaleMedia_Path = `_ScaleMedia`
const ConvertOptimizedMedia_Path = `_ConvertOptimizedMedia`
const TrimMedia_Path = `_TrimMedia`
const GenerateProxyMedia_Path = `_GenerateProxyMedia`
const OptimizeMedia_Path = `_OptimizeMedia`
const AdjustAudio_Path = `_AdjustAudio`

//-----File To Always Keep-----//

const FilesToAlwaysKeep = [
    // Base Folder
    `_AdjustAudio`,
    `_ConvertOptimizedMedia`,
    `_GenerateProxyMedia`,
    `_ListedFilesInFolder`,
    `_ListSubFolders`,
    `_LoopMedia`,
    `_OptimizeMedia`,
    `_ReduceFPS`,
    `_ReduceMediaDimensions`,
    `_ReverseMedia`,
    `_ScaleMedia`,
    `_TrimMedia`,
    `___YT-DLP`,
    `.git`,
    `.gitattributes`,
    `.gitignore`,
    `.vscode`,
    `icon.ico`,
    `images`,
    `node_modules`,
    `npm-install.ps1`,
    `package-lock.json`,
    `package.json`,
    `README.md`,
    `server.js`,
    `Start-DanRom-LocalTools.exe`,
    `Start-DanRom-LocalTools.ps1`,
    `Start-DanRom-LocalTools.py`,
    `views`,

    // YT-DLP
    `_AudioAndImageToVid.py`,
    `_RUN_FIRST-CoverImage.exe`,
    `_CoverImage.py`,
    `___yt-dlp.exe`,
    `_black.jfif`
]

//--END OF VARIABLE INITIALIZATIONS--//

//--BEGINNING OF HELPER FUNCTIONS--//

function onlyASCII(str) {
    return str.replace(/[^\x00-\x7F]/g, ``)
}

function removeNonASCII(path) {
    let items = fs.readdirSync(path)
    for (item of items) fs.renameSync(`${path}/${item}`, `${path}/${onlyASCII(item)}`)
}

function makeDir(dirPath) { if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath) }

function openDir(dir, option) {
    if (option === true || option === `Yes`) require(`child_process`).exec(`start "" "${dir}"`);
}

const dirPathsToMake = [
    LoopMedia_Path,
    ReverseMedia_Path,
    ReduceMedia_Path,
    ListedFilesInFolder_Path,
    ListSubFolders_Path,
    ReduceFPS_Path,
    ScaleMedia_Path,
    ConvertOptimizedMedia_Path,
    TrimMedia_Path,
    GenerateProxyMedia_Path,
    OptimizeMedia_Path,
    AdjustAudio_Path,
]

for (dirPath of dirPathsToMake) makeDir(dirPath)

const ReturnToHomeStr = `<p><button style='font-size: x-large' onclick=window.history.back()='/'>Return to Home</button></p>`
function scriptSuccessMessage(path, fileName) {
    return `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1 style='color:green'>Success!</h1>
        <p>Navigate to the <b>${path}</b> folder in the project to find the <b>${fileName}</b> file.
        ${ReturnToHomeStr}
    </body>
    `
}

function removeNonASCIISuccessMessage(path) {
    return `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1 style='color:green'>All Non-ASCII Characters Removed!</h1>
        <p>All non-ASCII characters have been removed from the <b>${path}</b> folder.</p>
        ${ReturnToHomeStr}
    </body>
    `
}

function incompleteForm(req) {
    return `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1 style='color:orange'>Incomplete Form</h1>
        ${ReturnToHomeStr}
        <h2>Form Data Submitted</h2>
        <pre>${JSON.stringify(req.body, null, 2)}</pre>
    `
}

function removeExt(fileName) {
    fileStrList = fileName.split(`.`)
    fileStrList.pop()
    let fileNoExt = ``
    for (str of fileStrList) { fileNoExt += str }
    return fileNoExt
}

function getSubFolders(folderPathList) {
    let foundFolder = false
    for (folderPath of folderPathList) {
        let subItemsList
        try {
            subItemsList = fs.readdirSync(folderPath)
            subItemsPathList = []
            for (sub of subItemsList) {
                subItemsPathList.push(`${folderPath}\\${sub}`)
            }
            foundFolder = false
            for (i in subItemsList) {
                try {
                    fs.readdirSync(`${folderPath}\\${subItemsList[i]}`)
                    foundFolder = true
                    folderPathList.push(subItemsPathList[i])
                } catch { }
            }
            if (foundFolder) getSubFolders(subItemsPathList)
        } catch { }
    }
    return folderPathList
}

function baseFilter(item, fileName) {
    return (item.includes(`.`) && item !== fileName && !(FilesToAlwaysKeep.includes(item)))
}

function fileFilter(item, fileName, IncludeExcludeOp, IncExcItems) {
    if (IncludeExcludeOp === `Include`) {
        return (baseFilter(item, fileName) && IncExcItems.includes(item))
    } else if (IncludeExcludeOp === `Exclude`) {
        return (baseFilter(item, fileName) && !(IncExcItems.includes(item)))
    } else return (baseFilter(item, fileName))
}

function powerOp(PowerOp) {
    if (PowerOp === `Hibernate`) return `shutdown /h\n`
    if (PowerOp === `Shut Down`) return `Stop-Computer\n`
    return `\n`
}

function writeFileToServer(contents, filePath) {
    fs.writeFileSync(filePath, contents, err => {
        if (err) {
            fs.appendFileSync(filePath, contents, err => {
                if (err) res.status(500).send(err)
            })
        }
    })
    return filePath
}

function ytdlpHelper(Thumbnail, Subtitles, Comments) {
    let str = ``
    if (Thumbnail) str += `--write-thumbnail --convert-thumbnails png `
    if (Subtitles) str += `--write-subs --sub-langs 'en.*,ja' `
    if (Comments) str += `--write-comments `
    return str
}

function FileNameURL_Helper(FileNameURLs, isURL) {
    let outputHTMLstr = `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1>Names Generated!</h1>
        <ul>`
    if (isURL) for (currentName of FileNameURLs) outputHTMLstr += `<li><a href='${currentName}'>${currentName}</a></li>`
    else for (currentName of FileNameURLs) outputHTMLstr += `<li>${currentName}</li>`

    outputHTMLstr += `</ul></body>`
    return outputHTMLstr
}

//--END OF HELPER FUNCTIONS--//

//--BEGINNING OF GLOBAL OPTION VARIABLE INITIALIZATIONS--//

let openDirWithScript = `No`
let mostRecentForm = ``

//--END OF GLOBAL OPTION VARIABLE INITIALIZATIONS--//

//---BEGINNING OF ROUTING---//

app.route(`/*`)
    .get((req, res) => {
        res.render(`index`, {
            //Global Options
            openDirWithScript: openDirWithScript,
            mostRecentForm: mostRecentForm,

            //Path Values
            YTDLP_Path: YTDLP_Path,
            LoopMedia_Path: LoopMedia_Path,
            ReverseMedia_Path: ReverseMedia_Path,
            ReduceMedia_Path: ReduceMedia_Path,
            ReduceFPS_Path: ReduceFPS_Path,
            ScaleMedia_Path: ScaleMedia_Path,
            ConvertOptimizedMedia_Path: ConvertOptimizedMedia_Path,
            TrimMedia_Path: TrimMedia_Path,
            GenerateProxyMedia_Path: GenerateProxyMedia_Path,
            OptimizeMedia_Path: OptimizeMedia_Path,
            AdjustAudio_Path: AdjustAudio_Path
        })
    })

    app.route(`/YT-DLP_GUI`)
    .post((req, res) => {
        mostRecentForm = `YT-DLP_GUI`

        let URLs = req.body.URLs.split(`\r\n`)

        let Video = req.body.Video
        let Audio = req.body.Audio
        let Thumbnail = req.body.Thumbnail
        let Subtitles = req.body.Subtitles
        let Comments = req.body.Comments

        let VidRes = req.body.VideoResolution

        let Channel = req.body.Channel

        if (req.body.OpenDir) openDir(YTDLP_Path, true)
        else if (req.body.RemoveNonASCII) {
            removeNonASCII(YTDLP_Path)
            res.send(removeNonASCIISuccessMessage(YTDLP_Path))
        } else if (!URLs || !YTDLP_Path || (!Video && !Audio && !Thumbnail && !Subtitles && !Comments)) res.send(incompleteForm(req))
        else {
            let commandStr = ``
            let baseStr = `./${YTDLP_Path} -o '`
            if (Channel) baseStr += `%(uploader)s - `
            baseStr += `%(title)s.%(ext)s'`

            for (URL of URLs) {
                if (Video) {
                    if (VidRes === `Best`) commandStr += commandStr += `${baseStr} '${URL}' -f bestvideo[ext=mp4]+bestaudio/best/best[ext=mp4]/best --embed-chapters --remux-video mp4 ${ytdlpHelper(Thumbnail, Subtitles, Comments)}\n`
                    else commandStr += `${baseStr} '${URL}' -f bestvideo[height=${VidRes}][ext=mp4]+bestaudio/best[height=${VidRes}]/best[ext=mp4]/best --embed-chapters --remux-video mp4 ${ytdlpHelper(Thumbnail, Subtitles, Comments)}\n`
                }

                if (Audio) {
                    commandStr += `${baseStr} '${URL}' -x --audio-format mp3 `
                    if (!Video) commandStr += `${ytdlpHelper(Thumbnail, Subtitles, Comments)} `
                    commandStr += `\n`
                }

                if (!(Video || Audio)) {
                    commandStr += `${baseStr} '${URL}' ${ytdlpHelper(Thumbnail, Subtitles, Comments)} --max-filesize 0.001k\n`
                }
            }

            commandStr += powerOp(req.body.PowerOp)
            commandStr = `./${YTDLP_Path} -U\n${commandStr}`

            let fileName = `__DownloadFiles.ps1`
            writeFileToServer(`${commandStr}${finalLine}`, `${YTDLP_Path}/${fileName}`)
            openDir(YTDLP_Path, openDirWithScript)
            res.send(scriptSuccessMessage(YTDLP_Path, fileName))
        }
    })

//---END OF ROUTING---//

// Start the server
const port = 2002
const appNameStr = `DanRom LocalTools`
app.listen(port, () => {
    console.log(`--------------------`);
    console.log(`CTRL + Click the URL to access ${appNameStr}: http://localhost:${port}`)
    console.log(`Keep this window open or minimized when using ${appNameStr}. Use CTRL+C to close the window and stop the server.`)
});