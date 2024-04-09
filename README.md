# DanRom-LocalTools

## Description

A NodeJS app which provides series of handy tools developed with love by Dante Romita. 💙
## Requirements For Full Usage

- Windows (For now)
- [NodeJS LTS](https://nodejs.org/en/download) (To run the application)
- [Python](https://www.python.org) (To run local scripts on your machine. The latest version is always recommended.)
- [eyeD3](https://eyed3.readthedocs.io/en/latest/installation.html) (A Python library for working with audio files. See below for more details.)
- [moviepy](https://pypi.org/project/moviepy/) (A Python library used for combining audio and thumbnails into an mp4 file. See below for more details.)
- [FFMPEG](https://www.ffmpeg.org) ("A complete, cross-platform solution to record, convert and stream audio and video." - [ffmpeg.org](https://www.ffmpeg.org))
## Recommendations
- Setting Execution Policy to **RemoteSigned** or **Unrestricted** on Windows (***At your own risk!***).
  - By default, .ps1 files may not run for security reasons. A safer alternative is to open each script and copy/paste the contents in a terminal to execute them manually if you don't want to change the execution policy. It's always good practice to read the scripts you're executing beforehand anyways. 🙂
  - If you do want to change the execution policy, I'd recommended [this article](https://techdirectarchive.com/2020/02/04/how-to-set-execution-policy/) to learn more.
- Setting the default file association of .ps1 files to run PowerShell via double-clicking
	1. **Open File Explorer:**
	   - Navigate to the folder containing your PowerShell script.
	2. **Right-click on the script file:**
	   - Find your PowerShell script file (.ps1) in File Explorer.
	   - Right-click on the file.
	3. **Select "Open with" > "Choose another app":**
	   - Choose "More apps" if PowerShell isn't listed.
	4. **Choose "Windows PowerShell":**
	   - If it's not listed, click "Look for another app on this PC" and browse to `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`.
	5. **Check "Always use this app to open .ps1 files":**
	   - Enable this option to set PowerShell as the default program for opening .ps1 files.
	6. **Click "OK" to apply the changes.**

- Ensure that the names of the files you are using are not too long. There is a character limit for Windows file paths, so if certain scripts don't run, consider decreasing the number of characters in the file path.

- [Microsoft PowerToys](https://learn.microsoft.com/en-ca/windows/powertoys/) ("Microsoft PowerToys is a set of utilities for power users to tune and streamline their Windows experience for greater productivity." - Microsoft Learn)
  - Use the "PowerRename" utility or "Bulk Rename Utility" to remove the unwanted '_____INPUT' prefix from your desired files.
- [Bulk Rename Utility](https://www.bulkrenameutility.co.uk) ("Bulk Rename Utility allows you to easily rename files and entire folders based upon extremely flexible criteria.")
  - A powerful alternative to the PowerRename utility that is also useful for removing unwanted prefixes from your desired files, along with much more!
- [MP3Gain](https://mp3gain.sourceforge.net) ("MP3Gain analyzes and adjusts mp3 files so that they have the same volume." - [mp3gain.sourceforge.net](mp3gain.sourceforge.net))
  - When working with MP3 files, especially when downloaded from YouTube it can be frustrating to have inconsistent levels of volume. This program helps take care of those inconsistences by changing the volume of each file to a target "normal" volume.
## Dev Resources
- [Auto PY to EXE](https://pypi.org/project/auto-py-to-exe/)
  - Useful for development purposes, as creating a .exe file from a .py script is very easy with this converter.
## Setup Instructions
1. Clone or download the .zip and save the project to a location of your choice. 
2. Install all requirements listed above.
3. Run the **Start-DanRom-LocalTools.exe**, compiled from **Start-DanRom-LocalTools.py** OR run **Start-DanRom-LocalTools.ps1** to start the server.
4. Navigate to **[http://localhost:2002](http://localhost:2002)** to start using the interface.
## Legend
You'll see buttons labelled with the following symbols for various features below. Here are their functions:

- 📜 = Generate Script + Open Corresponding Folder
- 📂 = Open Corresponding Folder (No change to any files)
- 🔠 = Remove Non-ASCII Characters In Corresponding Folder (Useful if running some scripts does nothing due to invalid characters in file names.)
## Features
- [YT-DLP GUI](#YT-DLP-GUI)
- [Optimize Media](#optimize-media)
- [Convert Optimized Media](#convert-optimized-media)
- [Generate Proxy Media](#generate-proxy-media)
- [Trim Media](#trim-media)
- [Loop Media](#loop-media)
- [Reverse Media](#reverse-media)
- [Reduce Media Dimensions](#reduce-media-dimensions)
- [Scale Media](#scale-media)
- [Reduce FPS](#reduce-fps)
- [Adjust Audio](#adjust-audio)
- [Remove Non-ASCII Characters](#remove-non-ascii-characters)
- [URL Cleaner](#url-cleaner)
- [Change Letter Case](#Change-Letter-Case)
- [Remove Line Breaks](#remove-line-breaks)
---
## YT-DLP GUI

A visual interface that generates a customized Powershell script that will download every video's data specified by the user, made possible by [yt-dlp](https://github.com/yt-dlp/yt-dlp), which comes included in this application! The video data you can download includes any combination of the following:

- Video (.mp4)
- Audio Only (.mp3)
- Thumbnail (.png)
- Subtitles (.vtt)
- Comments (.json)

After generating **__\DownloadFiles\.ps1**, run it to download all of the videos and their data.

**NOTES:**
- After downloading, it is recommended to use the **Remove Non-ASCII Characters** tool after downloading the files to remove all unfriendly characters that often lie in their file names!
### Audio + Image to MP4

**NOTES:**
- Use the **Remove Non-ASCII Characters** tool before using this one to ensure the generated script executes properly.

After generating .mp3 and .png files for each video, you can generate a script that will automatically combined both files into a .mp4 file with the push of a button! Run it and a python script will take care of the rest, courtesy of [moviepy](https://pypi.org/project/moviepy/).

Alternatively, you can also use a black image instead if you just want to use this tool for copyright checking.
### Updating MP3 Cover Images

**NOTES:**
- Use the **Remove Non-ASCII Characters** tool before using this one to ensure the generated script executes properly.

For .mp3 files, if you also downloaded that corresponding video's thumbnail, you can also run the following two files to add all thumbnail images to their corresponding mp3 cover images, courtesy of [eyeD3](https://eyed3.readthedocs.io/en/latest/).

1. **_\[RUN-FIRST\]_CoverImage.exe** OR **_\[RUN-FIRST\]_CoverImage.py** (Will generate the script in Step 2)
2. **_\[RUN-SECOND\]_CoverImage.ps1** (Will add all images to all mp3 files)

This is useful for MP3 players to help you identify songs and other audio files. You can also use [Mp3Tag](https://www.mp3tag.de/en/index.html) to verify that the album image was added successfully for free!
## Optimize Media

A visual interface that allows you to optimize your media files. By inputting a file into FFMPEG and requesting a direct output in which both files have the same input extension (or different ones of the same general file type, but that's the **Convert Optimized Media** feature), the program finds the best bitrate to preserve as much quality as possible but also ensures that it is not redundantly large. As such, you can reduce the file sizes of your media files by a great amount if you have a lot of ones that have a high bitrate and high-quality settings

You can also choose to mark the larger of the two files OR the input file to make it easier to find manage what you want to keep and remove. **Be sure to read the warnings listed on the interface before running it with either of these options selected**.

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.
- This tool may generate output files that are larger in size than their inputs. Use the corresponding marking option if you want to ensure differentiation between your larger and smaller files.
## Convert Optimized Media

A visual interface that allows you to convert media from one file type to any other valid type such that it is optimized. For example, if you have an MP4 file, you can generate an optimized MOV and MP3 file at the same. Enter as many extensions as you want, but make note that it'll take time if you have big files!

You can also choose to mark the larger of the two files OR the input file to make it easier to find and manage what you want to keep and remove. **Be sure to read the warnings listed on the interface before running it with either of these options selected**.

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.
- This tool may generate output files that are larger in size than their inputs. Use the corresponding marking option if you want to ensure differentiation between your larger and smaller files.

## Generate Proxy Media

A visual interface that allows you to easily generate media files of any bitrate and scale factor, the latter of which being between 0 and 1.

This feature is useful for individuals who want to minimize slowdown and the resources their computers use as they edit in video editing software. Playing a low-quality version of the footage you're working on helps tremendously, especially in large projects. The problem with certain in-app proxy media generation algorithms is that the proxy media files generated are WAY larger than they need to be. Luckily, ffmpeg's optimizations help with minimizing proxy media file sizes.

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Trim Media

A visual interface that allows you to trim media files by entering a start and end time, as well as a desired output file name. Please read the instructions on the interface for more information.

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Loop Media

A visual interface that allows you to loop media files any number of times.

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Reverse Media

A visual interface that allows you to generate a reversed version of any media file.

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Reduce Media Dimensions

A visual interface that allows you to generate reduced dimensions of media.

**NOTES:**
- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Scale Media

A visual interface that allows you to scale media. The following types of scaling are supported:

- fast_bilinear E..V…. fast bilinear
- bilinear E..V…. bilinear
- bicubic E..V…. bicubic
- experimental E..V…. experimental
- neighbor E..V…. nearest neighbor
- area E..V…. averaging area
- bicublin E..V…. luma bicubic, chroma bilinear
- gauss E..V…. gaussian
- sinc E..V…. sinc
- lanczos E..V…. lanczos
- spline E..V…. natural bicubic spline
- print_info E..V…. print info
- accurate_rnd E..V…. accurate rounding
- full_chroma_int E..V…. full chroma interpolation
- full_chroma_inp E..V…. full chroma input
- bitexact E..V…. 
- error_diffusion E..V…. error diffusion dither

Source: [https://gist.github.com/tayvano/6e2d456a9897f55025e25035478a3a50](https://gist.github.com/tayvano/6e2d456a9897f55025e25035478a3a50)

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Reduce FPS

A visual interface that allows you to generate an output video at a reduced framerate given an input video. This is useful for videos that are marked at higher frame rates, but no medialay back footage at a lower FPS. This is a good safe-saving measure as well as a way to prepare a video for interpolation at its proper framerate.

**NOTES:**

- It is recommended that the folder you're using this tool on, default or otherwise, does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## Adjust Audio

A visual interface that allows you to generate an output media file with an adjusted volume. This is useful if any of your media files are too quiet or too loud. You can adjust the volume via a multiplier or by decibel level.

**NOTES:**

- It is recommended that the folder you're using this tool on does not contain any non-media files (Other than the .ps1 script) or subfolders. Please move these files elsewhere before running the .ps1 script.

## File Name ↔️ URL Converter

A visual interface that allows you to generate URLs out of file names and vice versa. This is useful for keeping track of media created and/or posted by accounts on social media, as well as conveniently going to the original post. The instructions for how to use this feature in detail are on the interface itself, so check it out!

### Supported Platforms

- Twitter
- Tumblr
- Instagram
- Threads
- Bluesky
- Pixiv
- Furaffinity

## Remove Non-ASCII Characters

A visual interface that allows you to remove all non-ASCII characters from every folder you specify, with the option to include subfolders as well!

This tool is incredibly useful in conjunction with multiple other tools in this server. Many of the resources this server uses do not play nicely with characters like emojis and replacements for illegal characters such as colons and slashes. As a good safety practice, please run this tool BEFORE you run tools that deal with files.

## URL Cleaner

A visual interface for cleaning a URL for a social media or article post as much as possible. In today's internet, you'll find URLs that are super long. When it comes to placing a link in a text field that has a character limit, shortening URLs manually is often a chore. This interface streamlines the process to give you the shortest working URL possible so you can take back some of those precious characters.

Below are a few places where long URLs can appear:

- Articles (On any website)
- Instagram
- Twitter
- Tumblr

## Change Letter Case

A visual interface for changing the case of text, including the following:

- All uppercase
- All lowercase
- Invert Case
- Randomize Case (LIKE THis OR lIkE ThIs OR likE tHIS)

## Remove Line Breaks

A visual interface for removing all of the line breaks of a string. This tool is particularly useful when copying/pasting from PDFs where a single paragraph consists of multiple line breaks.

## Listify

A visual interface for converting comma-separated values to list form, useful for note-taking, especially in markdown files.

### Example

`Lamp Oil?, Rope?, BOMBS?!`
becomes
```
- Lamp Oil?
- Rope?
- BOMBS!?
```

-----

# Credits

- Back to Top Button courtesy of [Code Boxx](https://code-boxx.com/html-scroll-to-top-button/)
