const youtube = (url: string)=> window.open(url, '_blank')

const videos = {
  "egg game": "https://www.youtube.com/watch?v=K0OSfbPJFa4",
  "brian's hat": "https://www.youtube.com/watch?v=LO2k-BNySLI",
  "karl havoc": "https://www.youtube.com/watch?v=J4Fv3LFGCgo",
  "hot dog guy": "https://www.youtube.com/watch?v=WLfAf8oHrMo&pp=ygUMdGltIHJvYmluc29u",
  "sloppy steaks": "https://www.youtube.com/watch?v=buK45NW_ikI&"
}

type VideoName = keyof typeof videos;

const goToVideo = (name?: VideoName) => youtube(videos[name ?? Object.keys(videos)[0] as VideoName])

export const eggs: Record<string, (...args: any)=> void> = {
  goToVideo,
}