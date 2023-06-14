// 代码来源：https://github.com/xpl/crx-hotreload/edit/master/hot-reload.js
const filesInDirectory = (dir: any) => new Promise(resolve =>
    dir.createReader().readEntries((entries: any) =>
        Promise.all(entries.filter((e: any) => e.name[0] !== '.').map((e: any) =>
            e.isDirectory ?
                filesInDirectory(e) :
                new Promise(resolve => e.file(resolve))
        ))
            .then(files => [].concat(...files))
            .then(resolve)
    )
)

const timestampForFilesInDirectory = (dir: any) =>
    filesInDirectory(dir).then((files: any) =>
        files.map((f: any) => f.name + f.lastModifiedDate).join())

const reload = () => {
    window.chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs: any) => { // NB: see https://github.com/xpl/crx-hotreload/issues/5
        if (tabs[0]) {
            window.chrome.tabs.reload(tabs[0].id)
        }
        window.chrome.runtime.reload()
    })
}

const watchChanges = (dir: any, lastTimestamp?: any) => {
    timestampForFilesInDirectory(dir).then(timestamp => {
        if (!lastTimestamp || (lastTimestamp === timestamp)) {
            setTimeout(() => watchChanges(dir, timestamp), 3000) // retry after 1s
            console.log("插件文件夹没有变动，3秒后再检查...");
        } else {
            reload()
            console.log("插件文件夹有变动...");
        }
    })
}

window.chrome.management.getSelf((self: any) => {
    if (self.installType === 'development') {
        window.chrome.runtime.getPackageDirectoryEntry((dir: any) => watchChanges(dir))
    }
})