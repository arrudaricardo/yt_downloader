import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, colors } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { ipcRenderer } from 'electron'
const { dialog } = require('electron').remote
import { getVideoID, videoInfo as TvideoInfo, downloadOptions } from 'ytdl-core';


const useStyles = makeStyles(() =>
// .MuiFilledInput-root
  createStyles({
    textarea: {
      width: '70%',
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    donwload: {
      marginTop: '3em'
    }
  }),
);

async function getVideoInfo(link: string) {
  let response = await ipcRenderer.invoke('getInfo', link)
  return response
}

async function downloadFromInfo(info: TvideoInfo | null, options: downloadOptions, defaultPath: string) {
  let path = await dialog.showSaveDialog({
    title: "Save Location",
    defaultPath,
  })
  if (path.canceled) {
    return
  }
  let response = await ipcRenderer.invoke('downloadFromInfo', { info, options, path: path.filePath })
  return JSON.parse(response)
}

export default function Inputs() {
  const [url, setUrl] = useState('')
  const [videoId, setVideoID] = useState('')
  const [videoInfo, setVideoInfo] = useState<TvideoInfo | null>(null)
  const classes = useStyles()
  const thumbnails = () => videoInfo?.player_response.videoDetails.thumbnail.thumbnails
  const title = () => videoInfo?.title

  useEffect(() => {
    if (url.length >= 11) {
      getVideoInfo(url).then(res => {
        setVideoInfo(res)
      })
    } else {
      setVideoInfo(null)
    }
    try {
      let videoId = getVideoID(url)
      setVideoID(videoId)
    } catch (e) {
      setVideoID('')
    }
  }, [url])

  useEffect(() => {
    let thumbnail = thumbnails()
    let root = document.getElementsByTagName('body')[0]
    if (thumbnail) {
      if (root) {
        root.style.backgroundImage = `url(${thumbnail[0].url.split('?')[0]}`
      }
    } else {
      root.style.backgroundImage = `url(static://asset/back.webp)`
    }
    const videoTitle = title()
    const titleNode = document.getElementById('title') as HTMLElement
    if (videoTitle) {
      titleNode.innerText = videoTitle
    } else {
      titleNode.innerText = 'YouTube Downloader'
    }
  }, [videoInfo])

  function handleDownload() {
    if (videoInfo) {
      let title = videoInfo.title.replace(/ /g, '_')
        .replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
      downloadFromInfo(videoInfo, {}, `${title}.mp4`)
    }
  }

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <TextField
        classes={{ root: classes.textarea }}
        error={url.length === 0 || videoId.length ? false : true}
        value={url}
        onChange={e => setUrl(e.target.value)}
        id="youtube-url"
        label="YouTube Link"
        type="text"
        variant='filled'
        spellCheck={true}
        autoFocus={true}
        color='primary'
      />
      <Button className={classes.donwload + ' noDrag'}
        disabled={videoInfo ? false : true}
        onClick={handleDownload}
        variant="contained"
        color="primary"
        component="span">
        Download
      </Button>
    </Grid>
  )
}