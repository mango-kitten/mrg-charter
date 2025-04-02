// note for accidentally undocumented things: if it contains semicolons its not my original code
// note for comments - most are useless :3 youre welcome 💝
let songdata = {
    songs: [
        [
            0,
            [],
            "",
            15
        ]
    ]
}
let pixelspersecond = 300
let startdelay = 0
let enginever = "0.0.0"

// https://stackoverflow.com/a/34348306
let mousepos = []
onmousemove = function(e){mousepos = [e.clientX, e.clientY];}

let songcurrenttime = 0
let songisplaying = 0
let songplaying = 0
function playSong() {
    if (document.getElementById("musicplayer").src == "") {
        document.getElementById("musicplayerinput").src = songdata.songs[songplaying][2]
    }
    document.getElementById("musicplayer").play()
    songisplaying = 1
}
function pauseSong() {
    document.getElementById("musicplayer").pause()
    songisplaying = 0
}
function seekSong(seconds) {
    let musicplayer = document.getElementById("musicplayer")
    if (musicplayer.currentTime >= musicplayer.duration - seconds) {
        musicplayer.currentTime = musicplayer.duration
    } else {
        musicplayer.currentTime = musicplayer.currentTime + seconds
    }
    let prehitnotes = document.getElementsByClassName("noteobject")
    for (let i=0;i<prehitnotes.length;i++) {
        prehitnotes[i].classList = "noteobject"
    }
    resetScore()
    resetCombo()
}
function trackSong(seconds) {
    let musicplayer = document.getElementById("musicplayer")
    if (musicplayer.currentTime <= seconds) {
        musicplayer.currentTime = 0
    } else {
        musicplayer.currentTime = musicplayer.currentTime - seconds
    }
    let prehitnotes = document.getElementsByClassName("noteobject")
    for (let i=0;i<prehitnotes.length;i++) {
        prehitnotes[i].classList = "noteobject"
    }
    resetScore()
    resetCombo()
}
// mangos first useful comment on the next line
let lastactions = [] // [actiontype, oldpos, newpos, elemid] actiontype 0 = place, actiontype 1 = l/r translation, actiontype 2 = lane shift, actiontype 3 = note deletion
function undoLast() {
    let newestaction = lastactions.length - 1
    if (newestaction >= 0) {
        if (lastactions[newestaction][0] == 0) {
            let deletionnum = document.getElementById("noteholder").children.length
            let notedeleted = document.getElementById("noteholder").children[deletionnum-1]
            notedeleted.remove()
            songdata.songs[songplaying][1].pop()
            lastactions.pop()
        } else if (lastactions[newestaction][0] == 1) {
            const noteused = document.getElementById(lastactions[newestaction][3])
            noteused.style.left = `${lastactions[newestaction][1] + (Number(document.getElementById("noteholder").style.left.replace("px",""))*-1)}px`
            songdata.songs[songplaying][1][Number(lastactions[newestaction][3].replace("note",""))][0] = lastactions[newestaction][1]
            lastactions.pop()
        } else if (lastactions[newestaction][0] == 2) {
            let newtopnote = ((0.08*window.innerHeight)+(lastactions[newestaction][1]*window.innerHeight*0.12))
            const noteused = document.getElementById(lastactions[newestaction][3])
            noteused.style.top = `${newtopnote}px`
            songdata.songs[songplaying][1][Number(lastactions[newestaction][3].replace("note", ""))][1] = lastactions[newestaction][1]
            lastactions.pop()
        } else if (lastactions[newestaction][0] == 3) {
            let oldtop = ((0.08*window.innerHeight)+(lastactions[newestaction][1][1]*window.innerHeight*0.12))
            let noteslen = document.getElementById("noteholder").children.length
            const noteobj = document.getElementById(`noteholder`).appendChild(document.getElementsByClassName("noteobject")[0].cloneNode())
            noteobj.style.top = `${oldtop}px`
            noteobj.style.left = `${lastactions[newestaction][1][0]}px`
            noteobj.id = `note${noteslen}`
            notepx = Number(noteobj.style.left.replace("px","")) + ((Number(document.getElementById("musicplayer").currentTime)+startdelay)*pixelspersecond)
            songdata.songs[songplaying][1].push([notepx, lastactions[newestaction][1][1]])
            lastactions.pop()
        }
    }
}
function pushAction(type, oldv, newv, idv) {
    lastactions.push([type, oldv, newv, idv])
    if (lastactions.length > 10) {
        lastactions.shift()
    }
}

let gridon = 1
let gridscale = pixelspersecond/8
function toggleGrid() {
    if (gridon == 1) {
        gridon = 0
        document.getElementsByClassName("musicplayergrid")[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-3x3" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z"/>
</svg> OFF`
    } else {
        gridon = 1
        document.getElementsByClassName("musicplayergrid")[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-3x3" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z"/>
</svg> ON`
    }
}
function adjustGrid() {
    if (gridscale == pixelspersecond/8) {
        gridscale = pixelspersecond/10
        document.getElementsByClassName("musicplayergridchange")[0].innerHTML = "1/10 sec"
    } else if (gridscale == pixelspersecond/10) {
        gridscale = pixelspersecond/16
        document.getElementsByClassName("musicplayergridchange")[0].innerHTML = "1/16 sec"
    } else if (gridscale == pixelspersecond/16) {
        gridscale = pixelspersecond/32
        document.getElementsByClassName("musicplayergridchange")[0].innerHTML = "1/32 sec"
    } else if (gridscale == pixelspersecond/32) {
        gridscale = pixelspersecond/4
        document.getElementsByClassName("musicplayergridchange")[0].innerHTML = "1/4 sec"
    } else if (gridscale == pixelspersecond/4) {
        gridscale = pixelspersecond/6
        document.getElementsByClassName("musicplayergridchange")[0].innerHTML = "1/6 sec"
    } else if (gridscale == pixelspersecond/6) {
        gridscale = pixelspersecond/8
        document.getElementsByClassName("musicplayergridchange")[0].innerHTML = "1/8 sec"
    }
}

function convertTime(seconds) {
    let secondsleft = seconds-(Math.floor(seconds/60)*60)
    if (String(secondsleft).length == 1) {
        secondsleft = `0${String(secondsleft)}`
    }
    return `${Math.floor(seconds/60)}:${secondsleft}`
}
function changeTimeSld() {
    document.getElementById("currentTimeSlider").min = 0
    document.getElementById("currentTimeSlider").max = Math.round(Number(document.getElementById("musicplayer").duration)*10)
    document.getElementById("currentTimeSlider").value = 0
}
function changeTimeIndic() {
    let time = document.getElementById("musicplayertime")
    time.innerHTML = `${convertTime(Math.round(Number(document.getElementById("musicplayer").currentTime)))} / ${convertTime(Math.round(Number(document.getElementById("musicplayer").duration)))}`
}
function sldTimeUpdate() {
    document.getElementById("currentTimeSlider").value = Math.round(Number(document.getElementById("musicplayer").currentTime)*10)
    changeTimeIndic()
}

document.getElementById("musicplayerinput").addEventListener("change", function() {
    var media = URL.createObjectURL(this.files[0]);
    var audio = document.getElementById("musicplayer");
    audio.src = media;
    document.getElementById("currentTimeSlider")
    setTimeout( function () {
        changeTimeSld()
        changeTimeIndic()
        setUpSeconds()
        songdata.songs[songplaying][0] = Math.round(audio.duration*1000)
        songdata.songs[songplaying][2] = document.getElementById("musicplayerinput").files[0].name
    }, 300)
});

function roundDownNearest(start, interval, value) {
    let roundables = []
    let i = 0
    let roundedval = 0
    roundables.push(start)
    while (value-roundables[i] >= 0) {
        if (value-roundables[i] < value-roundedval && value-roundables[i] >= 0) {
            roundedval = roundables[i]
        }
        i = i+1
        roundables.push(start+(interval*i))
    }
    return roundedval
}

function cutNote(notevals, array) {
    let returnedarray = []
    for (let i=0;i<array.length;i++) {
        if (JSON.stringify(array[i]) == JSON.stringify(notevals)) {
        } else {
            returnedarray.push(array[i])
        }
    }
    return returnedarray
}

let noteclickmoveoverride = 0
document.addEventListener('mousedown', function (event) {
    if (event.button == 0 && document.getElementById("musicplayerinput").files[0]) {
        if (noteclickmoveoverride == 0) {
            if (event.target.parentElement) {
                if (event.target.parentElement.id != "rightclickmenu") {
                    let lanein = 0
                    let lanestarts = [window.innerHeight*0.2,window.innerHeight*0.32,window.innerHeight*0.44,window.innerHeight*0.56]
                    let laneends = [window.innerHeight*0.32,window.innerHeight*0.44,window.innerHeight*0.56,window.innerHeight*0.68]
                    for (let i=0;i<lanestarts.length;i++) {
                        if (mousepos[1]>=lanestarts[i] && mousepos[1]<laneends[i]) {
                            lanein = i+1
                        }
                    }
                    contextmenuelement.style.left = `-1000px`
                    contextmenuelement.style.top = `-1000px`
                    let topofnote = ((0.08*window.innerHeight)+(lanein*window.innerHeight*0.12))
                    let leftofnote
                    if (gridon == 1) {
                        leftofnote = roundDownNearest(indicOffset - nearestSecondOff, gridscale, mousepos[0]) + (Number(document.getElementById("noteholder").style.left.replace("px",""))*-1)
                    } else {
                        leftofnote = mousepos[0]-(window.innerHeight*0.015)+(Number(document.getElementById("noteholder").style.left.replace("px",""))*-1)
                    }
                    if (event.target.id.includes("note")) { // comment out this line through the next 'else' to make note placement more free - only mango will understand this
                        console.log("note object already exists there")
                    } else if (JSON.stringify(songdata.songs[songplaying][1]).includes(JSON.stringify([leftofnote,lanein]))) {
                        console.log("note object already exists there")
                    } else {
                        if (lanein != 0) {
                            let noteslen = document.getElementById("noteholder").children.length
                            const noteobj = document.getElementById(`noteholder`).appendChild(document.getElementsByClassName("noteobject")[0].cloneNode())
                            noteobj.style.top = `${topofnote}px`
                            noteobj.style.left = `${leftofnote}px`
                            noteobj.id = `note${noteslen}`
                            notepx = Number(noteobj.style.left.replace("px","")) + ((Number(document.getElementById("musicplayer").currentTime)+startdelay)*pixelspersecond)
                            songdata.songs[songplaying][1].push([notepx, lanein])
                            pushAction(0, [-1, -1], [leftofnote, lanein], noteobj.id)
                        }
                    }
                }
            }
        } else if (noteclickmoveoverride == 1) {
            let newleftnote
            if (gridon == 1) {
                newleftnote = roundDownNearest(indicOffset, gridscale, mousepos[0]) + (Number(document.getElementById("noteholder").style.left.replace("px",""))*-1)
            } else {
                newleftnote = mousepos[0]-(window.innerHeight*0.015)+(Number(document.getElementById("noteholder").style.left.replace("px",""))*-1)
            }
            const noteused = document.getElementById(contextmenuonid)
            let oldleftnote = songdata.songs[songplaying][1][Number(noteused.id.replace("note",""))][0]
            noteused.style.left = `${newleftnote}px`
            songdata.songs[songplaying][1][Number(contextmenuonid.replace("note",""))][0] = newleftnote + ((Number(document.getElementById("musicplayer").currentTime)+startdelay)*pixelspersecond)
            noteused.classList = "noteobject"
            noteclickmoveoverride = 0
            pushAction(1, oldleftnote, newleftnote, contextmenuonid)
        } else if (noteclickmoveoverride == 2) {
            let newtopnote
            let lanein = 0
            let lanestarts = [window.innerHeight*0.2,window.innerHeight*0.32,window.innerHeight*0.44,window.innerHeight*0.56] // dumb of ass past me decided to do it in vh and vw...
            let laneends = [window.innerHeight*0.32,window.innerHeight*0.44,window.innerHeight*0.56,window.innerHeight*0.68]
            for (let i=0;i<lanestarts.length;i++) {
                if (mousepos[1]>=lanestarts[i] && mousepos[1]<laneends[i]) {
                    lanein = i+1
                }
            }
            newtopnote = ((0.08*window.innerHeight)+(lanein*window.innerHeight*0.12))
            const noteused = document.getElementById(contextmenuonid)
            let oldlanein = songdata.songs[songplaying][1][Number(noteused.id.replace("note",""))][1]
            noteused.style.top = `${newtopnote}px`
            songdata.songs[songplaying][1][Number(contextmenuonid.replace("note", ""))][1] = lanein
            noteused.classList = "noteobject"
            noteclickmoveoverride = 0
            pushAction(2, oldlanein, lanein, contextmenuonid)
        }
    } else {
        if (document.getElementById("musicplayerinput").files[0]) {
            // nobody tell her (mango) about the ! operator
        } else {
            console.log("please upload a song before adding notes")
        }
    }
    exportMenu()
})

setInterval( function () {
    nearestSecondOff = (Number(document.getElementById("musicplayer").currentTime)-Math.floor(Number(document.getElementById("musicplayer").currentTime)))*pixelspersecond
    let nodes = document.getElementById("noteholder").children
    if (nodes.length > 0) {
        for (let i=0;i<nodes.length;i++) {
            nodes[i].style.left = `${Number(songdata.songs[songplaying][1][i][0])-(Number(document.getElementById("musicplayer").currentTime)*pixelspersecond)}px`
            if (nodes[i].classList == "noteobject noteobjecthit") {
                // unhelpful comments? thats the whole point
            } else {
                if (Number(nodes[i].style.left.replace("px","")) > (93)-(pixelspersecond*0.2) && Number(nodes[i].style.left.replace("px","")) < (93)+(pixelspersecond*0.2)) {
                    nodes[i].classList = `noteobject noteobjectactive noteobjectsuper`
                } else if (Number(nodes[i].style.left.replace("px","")) > (93)-(pixelspersecond*0.4) && Number(nodes[i].style.left.replace("px","")) < (93)+(pixelspersecond*0.4)) {
                    nodes[i].classList = `noteobject noteobjectactive`
                } else {
                    if (nodes[i].classList == "noteobject noteobjectactive") {
                        resetCombo()
                    }
                    nodes[i].classList = `noteobject`
                }
            }
            if (noteclickmoveoverride == 1 && nodes[i].id == contextmenuonid) {
                nodes[i].classList = `${nodes[i].classList} noteobjectselected`
            }
            if (noteclickmoveoverride == 2 && nodes[i].id == contextmenuonid) {
                nodes[i].classList = `${nodes[i].classList} noteobjectselected`
            }
        }
    }
    nodes = document.getElementById("secondholder").children
    if (nodes.length > 0) {
        for (let i=0;i<nodes.length;i++) {
            nodes[i].style.left = `${(Number(nodes[i].id.replace("second","")*pixelspersecond)+indicOffset)-(Number(document.getElementById("musicplayer").currentTime)*pixelspersecond)}px` // ough so much logic
        }
    }
}, 30)

function keyFired(keyindex) {
    document.getElementById(`indic${keyindex}`).classList = `indicobject indicactive`
    let noteattempt = 0
    let notefound = undefined
    while (notefound == undefined) {
        let notetesting = document.getElementsByClassName("noteobjectactive")[noteattempt]
        if (notetesting) {
            if (Number(songdata.songs[songplaying][1][Number(notetesting.id.replace("note",""))][1]) == Number(keyindex)) {
                notefound = document.getElementsByClassName("noteobjectactive")[noteattempt]
            }
        } else {
            notefound = "None"
        }
        noteattempt = noteattempt + 1
    }
    if (notefound != "None") {
        notefound.classList = "noteobject noteobjecthit"
        changeScore(((pixelspersecond*0.4)- Math.abs(Number(notefound.style.left.replace("px",""))-70))*(800/70)) // where the magic happens (future me doesnt know how the fuck this part works)
        increaseCombo()
    } else {
        console.log("There are no available notes in this lane!")
        resetCombo()
    }
}
function keyReleased(keyindex) {
    document.getElementById(`indic${keyindex}`).classList = `indicobject`
}


// function checkHover(element) {
//     return element.matches(':hover')
// }

const contextmenuelement = document.createElement("div")
contextmenuelement.id = "rightclickmenu"
contextmenuelement.classList = "rightclickmenu"
contextmenuelement.style.position = "absolute"
contextmenuelement.style.top = "-1000px"
contextmenuelement.style.left = "-1000px"
contextmenuelement.style.width = "90px"
contextmenuelement.style.height = "30px"
contextmenuelement.style.backgroundColor = "white"
contextmenuelement.style.borderRadius = "5px"
contextmenuelement.innerHTML = `<div class="contextitem context1" onclick="moveNote()">&#8596;</div><div class="contextitem context2" onclick="changeLane()">&#8597;</div><div class="contextitem context3" onclick="deleteNote()">--</div>`
document.body.appendChild(contextmenuelement)


function moveNote() {
    noteclickmoveoverride = 1
    document.getElementById(contextmenuonid).classList = "noteobject noteobjectselected"
    contextmenuelement.style.left = `-1000px`
    contextmenuelement.style.top = `-1000px`
}
function changeLane() {
    noteclickmoveoverride = 2
    document.getElementById(contextmenuonid).classList = "noteobject noteobjectselected"
    contextmenuelement.style.left = `-1000px`
    contextmenuelement.style.top = `-1000px`
}
function deleteNote() {
    let oldnotevals = contextmenuonvals
    songdata.songs[songplaying][1] = cutNote(contextmenuonvals, songdata.songs[songplaying][1])
    document.getElementById(contextmenuonid).remove()
    contextmenuelement.style.left = `-1000px`
    contextmenuelement.style.top = `-1000px`
    let nodes = document.getElementById("noteholder").children
    if (nodes.length > 0) {
        for (let i=0;i<nodes.length;i++) {
            nodes[i].id = `note${i}`
        }
    }
    pushAction(3, oldnotevals, [-1, -1], contextmenuonid)
}

let contextmenuonvals = []
let contextmenuonid = ""
// https://stackoverflow.com/a/4909312
if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        if (e.target.id.includes("note")) {
            contextmenuonid = e.target.id
            // I FOUND THE BUG <- this is staying in the code
            contextmenuonvals = [songdata.songs[songplaying][1][Number(e.target.id.replace("note",""))][0], songdata.songs[songplaying][1][Number(e.target.id.replace("note",""))][1]]
            contextmenuelement.style.left = `${e.target.style.left}`
            contextmenuelement.style.top = `${e.target.style.top}`
        } 
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() { // might not work :(
        window.event.returnValue = false;
        if (window.event.target.id.includes("note")) {
            contextmenuonid = window.event.target.id
            contextmenuonvals = [Number(window.event.target.style.left.replace("px","")), songdata.songs[songplaying][1][Number(window.event.target.id.replace("note",""))][1]]
            contextmenuelement.style.left = `${window.event.target.style.left}`
            contextmenuelement.style.top = `${window.event.target.style.top}`
        }
    });
}

const exportelement = document.createElement("div")
exportelement.id = "exportmaintext"
exportelement.classList = "exportmaintext"

document.body.appendChild(exportelement)

function exportMenu() {
    exportelement.innerHTML = `${encrypt(JSON.stringify(songdata.songs[songplaying]))}`
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function downloadSave(data) {
    var songname = document.getElementById("musicplayerinput").files[0].name.replace(".mp3","")
    download(`let data${songname} = "${data}"`, `MRG_Song_${songname}_v${enginever}.txt`, "text/plain")
}

function fullExport() {
    let encryptedsave = `STARTOFMRGFILE${encrypt(JSON.stringify(songdata.songs[songplaying]))}ENDOFMRGFILE`
    if (confirm("This action will generate and download a file for song transfer! Please be sure you want to do this.")) {
        downloadSave(encryptedsave)
    } else {
        console.log("Canceled")
    }
}
let currentsavedata = ""
function uploadSave() {
    var file = document.getElementById("songplayerdatainput").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            currentsavedata = evt.target.result
            return evt.target.result
        }
        reader.onerror = function (evt) {
            return "Invalid file inputted"
        }
    } else {
        return "No file"
    }
}
function removeFluff(savedata) {
    return savedata.replace(/l.*?=/,"").replace(` "`,"").replace(`"`,"").replace("STARTOFMRGFILE","").replace("ENDOFMRGFILE","")
}
function removeBasicFluff(savedata) {
    return savedata.replace("STARTOFMRGFILE","").replace("ENDOFMRGFILE","")
}
function importSave(savestr) {
    try {
        var newsave = JSON.parse(savestr)

        if (newsave[0] && newsave[1] && newsave[2] && newsave[3]) {
            return newsave
        } else {
            return 0
        }
    } catch (error) {
        return 0
    }
}
function fullImport() {
    if (confirm("This will OVERWRITE the song you are currently charting! Are you sure you want to do this?")) {
        uploadSave()
        setTimeout(function () {
            let newsongdata = importSave(decrypt(removeFluff(currentsavedata)))
            if (newsongdata == 0) {
                console.log("Failed Import (Invalid JSON)")
            } else {
                songdata.songs[songdata.songs.length] = newsongdata
                songplaying = songdata.songs.length - 1
                setTimeout( function () {
                    clearNotes()
                }, 100)
                setTimeout( function () {
                    buildNotes()
                }, 200)
            }
            console.log(newsongdata)
        }, 20)
        
    } else {
        console.log("Canceled action")
    }
}
function buildNotes() {
    for (let i=0;i<songdata.songs[songplaying][1].length;i++) {
        let noteslen = document.getElementById("noteholder").children.length
        let topofnote = ((0.08*window.innerHeight)+(songdata.songs[songplaying][1][i][1]*window.innerHeight*0.12))
        const noteobj = document.getElementById(`noteholder`).appendChild(document.getElementsByClassName("noteobject")[0].cloneNode())
        noteobj.style.top = `${topofnote}px`
        noteobj.style.left = `${songdata.songs[songplaying][1][i][0]}px`
        noteobj.id = `note${noteslen}`
    }
}

// https://stackoverflow.com/a/22966637
function clearNotes() {
    let node = document.getElementById("noteholder")
    var cNode = node.cloneNode(false);
    node.parentNode.replaceChild(cNode, node);
}


let songfilevars = [datatwilight_test]
function readAllSongs() {
    for (let i=0;i<songfilevars.length;i++) {
        let newsongdata = importSave(decrypt(removeBasicFluff(songfilevars[i])))
        if (newsongdata == 0) {
            console.log("Failed Import (Invalid JSON)")
        } else {
            songdata.songs[songdata.songs.length] = newsongdata
        }
        console.log(newsongdata)
    }
}
// woah this was line 555 at one point in time. maybe itll stay that way
readAllSongs()


function beatDrop() { // DOESNT WORK YET
    let lanes = document.getElementsByClassName("laneobject")
    for (let i=0;i<lanes.length;i++) {
        lanes[i].classList = `laneobject lane${i} lanebeatdrop`
    }
    setTimeout( function () {
        for (let i=0;i<lanes.length;i++) {
            lanes[i].classList = `laneobject lane${i} lanebeat`
        }
    }, 1000)
}