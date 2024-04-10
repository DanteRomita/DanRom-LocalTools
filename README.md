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

-----

# Credits

- Back to Top Button courtesy of [Code Boxx](https://code-boxx.com/html-scroll-to-top-button/)
