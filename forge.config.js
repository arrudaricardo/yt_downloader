module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin', 'linux'],
            config: {
                // Config here
            }
        },
        {
          name: '@electron-forge/publisher-github',
          config: {
            repository: {
              owner: 'dearruda',
              name: 'yt_downloader'
            }
        }
      }
    ]
}