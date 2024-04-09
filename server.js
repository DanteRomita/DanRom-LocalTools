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
const FFMPEG_Path = `___FFMPEG`

// const LoopMedia_Path = `_LoopMedia`
// const ReverseMedia_Path = `_ReverseMedia`
// const ReduceMedia_Path = `_ReduceMediaDimensions`
// const ListedFilesInFolder_Path = `_ListedFilesInFolder`
// const ListSubFolders_Path = `_ListSubFolders`
// const ReduceFPS_Path = `_ReduceFPS`
// const ScaleMedia_Path = `_ScaleMedia`
// const ConvertOptimizedMedia_Path = `_ConvertOptimizedMedia`
// const TrimMedia_Path = `_TrimMedia`
// const GenerateProxyMedia_Path = `_GenerateProxyMedia`
// const OptimizeMedia_Path = `_OptimizeMedia`
// const AdjustAudio_Path = `_AdjustAudio`

//-----File To Always Keep-----//

const FilesToAlwaysKeep = [
    // Base Folders
    // `_AdjustAudio`,
    // `_ConvertOptimizedMedia`,
    // `_GenerateProxyMedia`,
    // `_ListedFilesInFolder`,
    // `_ListSubFolders`,
    // `_LoopMedia`,
    // `_OptimizeMedia`,
    // `_ReduceFPS`,
    // `_ReduceMediaDimensions`,
    // `_ReverseMedia`,
    // `_ScaleMedia`,
    // `_TrimMedia`,
    `___YT-DLP`,
    `___FFMPEG`,
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
    for (i of items) fs.renameSync(`${path}/${i}`, `${path}/${onlyASCII(i)}`)
}

function makeDir(dirPath) { if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath) }

function openDir(dir, option) {
    if (option === true || option === `Yes`) require(`child_process`).exec(`start "" "${dir}"`);
}

const dirPathsToMake = [
    FFMPEG_Path
    // LoopMedia_Path,
    // ReverseMedia_Path,
    // ReduceMedia_Path,
    // ListedFilesInFolder_Path,
    // ListSubFolders_Path,
    // ReduceFPS_Path,
    // ScaleMedia_Path,
    // ConvertOptimizedMedia_Path,
    // TrimMedia_Path,
    // GenerateProxyMedia_Path,
    // OptimizeMedia_Path,
    // AdjustAudio_Path,
]

for (dirPath of dirPathsToMake) makeDir(dirPath)

const ReturnToFormBtn = `<p><button style='font-size: large' onclick=window.history.back()='/'>Return to Form</button></p>`
function scriptSuccessMessage(path, fileName) {
    return `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1 style='color:green'>Success!</h1>
        <p>Navigate to the <b>${path}</b> folder in the project to find the <b>${fileName}</b> file.
        ${ReturnToFormBtn}
    </body>
    `
}

function removeNonASCIISuccessMessage(path) {
    return `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1 style='color:green'>All Non-ASCII Characters Removed!</h1>
        <p>All non-ASCII characters have been removed from the <b>${path}</b> folder.</p>
        ${ReturnToFormBtn}
    </body>
    `
}

function incompleteForm(req) {
    return `
    <body style='font-family: arial; word-wrap: break-word'>
        <h1 style='color:orange'>Incomplete Form</h1>
        ${ReturnToFormBtn}
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

function handleMarkLarger(inFile, outFile, fileName, ext) {
    let fileStr = ext ? `${removeExt(inFile)}.${ext}` : `${inFile}`
    if (inFile !== fileName && !(FilesToAlwaysKeep.includes(inFile))) {
        return `$inFile = Get-Item -LiteralPath "${inFile}"
$outFile = Get-Item -LiteralPath "${outFile}"
If ($inFile.Length -gt $outFile.Length) {
    Rename-Item -LiteralPath "${inFile}" -NewName "_____LARGER ${inFile}"
    Rename-Item -LiteralPath "${outFile}" -NewName "${fileStr}"
}\n`
    }
}

function handleMarkInput(inFile, outFile, fileName, ext) {
    if (inputFilesMarked) marker = `TEMP`

    let fileStr = ext ? `${removeExt(inFile)}.${ext}` : `${inFile}`
    if (inFile !== fileName && !(FilesToAlwaysKeep.includes(inFile))) {
        return `Rename-Item -LiteralPath "${inFile}" -NewName "_____${marker} ${inFile}"
        Rename-Item -LiteralPath "${outFile}" -NewName "${fileStr}"\n`
    }
}

function handleMarking(inFile, outFile, fileName, MarkOption, ext) {
    console.log(`MarkOption: ${MarkOption}`)
    let markingCommands = ``
    if (MarkOption === `MarkLarger`) markingCommands = handleMarkLarger(inFile, outFile, fileName, ext)
    if (MarkOption === `MarkInput`) markingCommands = handleMarkInput(inFile, outFile, fileName, ext)
    return markingCommands
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
            // Global Options
            openDirWithScript: openDirWithScript,
            mostRecentForm: mostRecentForm,

            // Path Values
            YTDLP_Path: YTDLP_Path,
            FFMPEG_Path: FFMPEG_Path,
            // LoopMedia_Path: LoopMedia_Path,
            // ReverseMedia_Path: ReverseMedia_Path,
            // ReduceMedia_Path: ReduceMedia_Path,
            // ReduceFPS_Path: ReduceFPS_Path,
            // ScaleMedia_Path: ScaleMedia_Path,
            // ConvertOptimizedMedia_Path: ConvertOptimizedMedia_Path,
            // TrimMedia_Path: TrimMedia_Path,
            // GenerateProxyMedia_Path: GenerateProxyMedia_Path,
            // OptimizeMedia_Path: OptimizeMedia_Path,
            // AdjustAudio_Path: AdjustAudio_Path
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

        // Check if form is complete
        if (!URLs || !YTDLP_Path || (!Video && !Audio && !Thumbnail && !Subtitles && !Comments)) {
            res.send(incompleteForm(req));
            return
        }

        // Opens the YT-DLP folder
        else if (req.body.OpenDir) {
            openDir(YTDLP_Path, true);
            return
        }

        // Removes non-ASCII characters in the YT-DLP folder
        else if (req.body.RemoveNonASCII) {
            removeNonASCII(YTDLP_Path);
            res.send(removeNonASCIISuccessMessage(YTDLP_Path));
            return
        }

        // Creates the AudioAndImageToVid.ps1 script
        else if (req.body.AudioAndImageToVid) {
            const fileName = `_AudioAndImageToVid.ps1`;
            let items = fs.readdirSync(YTDLP_Path);
            let commandStr = ``;

            for (item of items) {
                if (item.endsWith(`.mp3`) && item !== fileName) {
                    let mp3Item = item;
                    let imgItem = req.body.UseBlack ? `_black.jfif` : item.replaceAll(`.mp3`, `.png`);
                    let itemNoExt = item.replaceAll(`.mp3`, ``).replaceAll(`.png`, ``).replaceAll(`.jfif`, ``);

                    commandStr += `python _AudioAndImageToVid.py "${imgItem}" "${mp3Item}" "${itemNoExt}.mp4"\n`;
                }
            }

            commandStr += powerOp(req.body.PowerOp);

            writeFileToServer(`${commandStr}${finalLine}`, `${YTDLP_Path}/${fileName}`);
            openDir(YTDLP_Path, openDirWithScript);
            res.send(scriptSuccessMessage(YTDLP_Path, fileName));
            return
        }

        // Creates the main YT-DLP script titled "__DownloadFiles.ps1"
        else if (!req.body.OpenDir && !req.body.RemoveNonASCII && !req.body.AudioAndImageToVid) {
            let commandStr = ``;
            let baseStr = `./${YTDLP_Path} -o '`;
            if (Channel) baseStr += `%(uploader)s - `;
            baseStr += `%(title)s.%(ext)s'`;

            for (URL of URLs) {
                if (Video) {
                    if (VidRes === `Best`) {
                        commandStr += `${baseStr} '${URL}' -f bestvideo[ext=mp4]+bestaudio/best/best[ext=mp4]/best --embed-chapters --remux-video mp4 ${ytdlpHelper(Thumbnail, Subtitles, Comments)}\n`;
                    } else {
                        commandStr += `${baseStr} '${URL}' -f bestvideo[height=${VidRes}][ext=mp4]+bestaudio/best[height=${VidRes}]/best[ext=mp4]/best --embed-chapters --remux-video mp4 ${ytdlpHelper(Thumbnail, Subtitles, Comments)}\n`;
                    }
                }

                if (Audio) {
                    commandStr += `${baseStr} '${URL}' -x --audio-format mp3 `;
                    if (!Video) commandStr += `${ytdlpHelper(Thumbnail, Subtitles, Comments)} `;
                    commandStr += `\n`;
                }

                if (!(Video || Audio)) {
                    commandStr += `${baseStr} '${URL}' ${ytdlpHelper(Thumbnail, Subtitles, Comments)} --max-filesize 0.001k\n`;
                }
            }

            commandStr += powerOp(req.body.PowerOp);
            commandStr = `./${YTDLP_Path} -U\n${commandStr}`;

            let fileName = `__DownloadFiles.ps1`;
            writeFileToServer(`${commandStr}${finalLine}`, `${YTDLP_Path}/${fileName}`);
            openDir(YTDLP_Path, openDirWithScript);
            res.send(scriptSuccessMessage(YTDLP_Path, fileName));
            return
        }
    })

let inputFilesMarked = false
let marker = `INPUT`

app.route(`/FFMPEG_GUI`)
    .post((req, res) => {
        mostRecentForm = `FFMPEG_GUI`
        inputFilesMarked = false
        marker = `INPUT`

        if (req.body.OpenDir) {
            openDir(FFMPEG_Path, true);
            return
        }

        else if (req.body.RemoveNonASCII) {
            removeNonASCII(FFMPEG_Path);
            res.send(removeNonASCIISuccessMessage(FFMPEG_Path));
            return
        }

        else if (req.body.WriteScript) {
            // Initialization
            const fileName = `__FFMPEG_Script.ps1`

            let MarkOption = req.body.MarkOption;
            let CustomPath = req.body.CustomPath;
            let IncExc_Option = req.body.IncExc_Option;
            let IncExc_Items = req.body.IncExc_Items.split(`\r\n`).filter(item => item !== '');
            let PowerOp = req.body.PowerOp;
            let OutputExtensions = req.body.OutputExtensions.split(`\r\n`).filter(item => item !== '');
            let CustomBitrate = req.body.CustomBitrate;
            let CustomFramerate = req.body.CustomFramerate;
            let TypeOfScaling = req.body.TypeOfScaling;
            let Preset_16x9_Dimensions = req.body.Preset_16x9_Dimensions;
            let ScaleType = req.body.ScaleType;
            let ScaleMultiplier = req.body.ScaleMultiplier;
            let NumLoops = req.body.NumLoops;
            let ReverseMedia = req.body.ReverseMedia;

            let InputFileNames = req.body.InputFileNames.split(`\r\n`).filter(item => item !== '')
            let OutputFileNames = req.body.OutputFileNames.split(`\r\n`).filter(item => item !== '');
            let StartTimes = req.body.StartTimes.split(`\r\n`).filter(item => item !== '')
            let EndTimes = req.body.EndTimes.split(`\r\n`).filter(item => item !== '')

            let pathToUse = FFMPEG_Path
            if (CustomPath !== ``) pathToUse = CustomPath.replaceAll(`"`, ``)

            let folderItems = fs.readdirSync(pathToUse)

            let commandStr = ``

            // Trim Media First If Selected (Least computationally expensive)
            if (req.body.TrimMedia) {

                // Check if input lengths are equal for all text areas
                if (InputFileNames.length !== OutputFileNames.length || InputFileNames.length !== StartTimes.length || InputFileNames.length !== EndTimes.length) {
                    res.send(`
                    <body style='font-family: arial; word-wrap: break-word'>
                        <h1 style='color:red'>Invalid Input</h1>
                        <p>The number of InputFileNames, OutputFileNames, StartTimes, and EndTimes must be the same.</p>
                        ${ReturnToFormBtn}
                        <pre>${JSON.stringify(req.body, null, 2)}</pre>
                    </body>
                    `)
                    return
                }

                // Check if input and output names are the same, returning with an invalid input message if they are
                for (let i = 0; i < InputFileNames.length; i++) {
                    if (InputFileNames[i] === OutputFileNames[i]) {
                        res.send(`
                        <body style='font-family: arial; word-wrap: break-word'>
                            <h1 style='color:red'>Invalid Input</h1>
                            <p>The file's input name cannot be the same as its output name.</p>
                            ${ReturnToFormBtn}
                            <pre>${JSON.stringify(req.body, null, 2)}</pre>
                        </body>
                        `)
                        break
                    }
                }

                for (let i = 0; i < InputFileNames.length; i++) {
                    commandStr += `ffmpeg -ss "${StartTimes[i]}" -to "${EndTimes[i]}" -i "${InputFileNames[i].replaceAll(`$`, `\`$`)}" -vcodec copy -acodec copy "${OutputFileNames[i].replaceAll(`$`, `\`$`)}"\n`
                }

                if (req.body.MarkOption === `MarkInput`) {
                    for (let i = 0; i < InputFileNames.length; i++) {
                        commandStr += `Rename-Item -LiteralPath "${InputFileNames[i].replaceAll(`$`, `\`$`)}" -NewName "_____${marker} ${InputFileNames[i].replaceAll(`$`, `\`$`)}"\n`
                    }
                    inputFilesMarked = true
                }
            }

            let selectedFiles
            if (req.body.TrimMedia && OutputFileNames.length > 0) selectedFiles = OutputFileNames
            else selectedFiles = folderItems

            // Handle modification parameters for output files
            let modifications = ``

            let loopStr = ``
            if (req.body.LoopMedia && NumLoops !== ``) {
                loopStr += `-stream_loop ${NumLoops}`
            }

            let vfFilters = ``
            let afFilters = ``

            if (req.body.UseCustomResolution && TypeOfScaling === `16x9`) {
                vfFilters += `scale=${Preset_16x9_Dimensions},`
            }
            if (req.body.UseCustomResolution && TypeOfScaling === `CustomScaling` && ScaleMultiplier !== ``) {
                vfFilters += `scale=iw*${ScaleMultiplier}:ih*${ScaleMultiplier}:-1:flags=${ScaleType},split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse,`
            }

            // if (req.body.LoopMedia && NumLoops !== ``) {
            //     vfFilters += `loop=${NumLoops}:1,setpts=N/FRAME_RATE/TB,`
            // }
            if (ReverseMedia) {
                vfFilters += `reverse,`
                afFilters += `areverse,`
            }

            // Remove the trailing comma from the filters if they are not empty
            vfFilters = vfFilters.replace(/(^,)|(,$)/g, "")
            afFilters = afFilters.replace(/(^,)|(,$)/g, "")

            let vfStr = `-vf "${vfFilters}" `
            let afStr = `-af "${afFilters}" `

            if (vfFilters != ``) modifications += vfStr
            if (afFilters != ``) modifications += afStr

            if (req.body.UseCustomBitrate && CustomBitrate !== ``) modifications += `-b:v ${CustomBitrate}k -bufsize ${CustomBitrate}k `
            if (req.body.UseCustomFramerate && CustomFramerate !== ``) modifications += `-r ${CustomFramerate} `

            modifications = modifications.trim()

            for (inFile of selectedFiles) {
                if (fileFilter(inFile, fileName, IncExc_Option, IncExc_Items)) {
                    inFile.replaceAll(`$`, `\`$`)

                    let outFile
                    // Determine output file extensions
                    if (req.body.ConvertFileType && OutputExtensions.length > 0) {    // Use corresponding extensions in OutputExtensions
                        let finalExt = ``
                        for (ext of OutputExtensions) {
                            outFile = `(OUTPUT) ${removeExt(inFile)}.${ext}`
                            commandStr += `ffmpeg ${loopStr} -i "${inFile}" ${modifications} "${outFile}"\n`
                            finalExt = ext
                        }
                        if (MarkOption !== `None`) commandStr += handleMarking(inFile, outFile, fileName, MarkOption, finalExt)
                    } else {
                        // Use default extensions
                        outFile = `(OUTPUT) ${inFile}`
                        commandStr += `ffmpeg ${loopStr} -i "${inFile}" ${modifications} "${outFile}"\n`

                        if (MarkOption !== `None`) commandStr += handleMarking(inFile, fileName, MarkOption)
                    }
                }
            }

            // Final pass of any files not properly renamed
            if (MarkOption !== `None`) commandStr += `
$files = Get-ChildItem -LiteralPath "${pathToUse}" -File
foreach ($file in $files) {
    # Check if the file name contains '(OUTPUT)'
    if ($file.Name -like '*(OUTPUT)*') {
        # Remove '(OUTPUT)' from the file name
        $newName = $file.Name -replace '\\(OUTPUT\\) ', ''
        # Rename the file
        Rename-Item -Path $file.FullName -NewName $newName
    }
}\n`;

            // Finalize Script
            commandStr += powerOp(PowerOp);
            writeFileToServer(`${commandStr}${finalLine}`, `${pathToUse}/${fileName}`);
            openDir(FFMPEG_Path, openDirWithScript);
            try {
                res.send(scriptSuccessMessage(FFMPEG_Path, fileName));
            } catch (e) { }

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
    console.log(`--------------------`);
});