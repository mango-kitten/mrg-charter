let gamedata = null

gamedata = {
    keys: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    score: 0,
    combo: 0
}

let indicOffset = 80

window.addEventListener("keydown", keyDown)
function keyDown(evt) {
    if (evt.keyCode >= 65 && evt.keyCode <= 90) {
        gamedata.keys[Number(evt.keyCode)-65] = 1
        for (let i=0;i<savedata.userkeys.length;i++) {
            if (evt.key == savedata.userkeys[i]) {
                keyFired(i+1)
            }
        }
    } else if (evt.keyCode>=48 && evt.keyCode <= 57) {
        gamedata.keys[Number(evt.keyCode)-22] = 1
        for (let i=0;i<savedata.userkeys.length;i++) {
            if (evt.key == savedata.userkeys[i]) {
                keyFired(i+1)
            }
        }
    }
}

window.addEventListener("keyup", keyUp)
function keyUp(evt) {
    if (evt.keyCode >= 65 && evt.keyCode <= 90) {
        gamedata.keys[Number(evt.keyCode)-65] = 0
        for (let i=0;i<savedata.userkeys.length;i++) {
            if (evt.key == savedata.userkeys[i]) {
                keyReleased(i+1)
            }
        }
    } else if (evt.keyCode>=48 && evt.keyCode <= 57) {
        gamedata.keys[Number(evt.keyCode)-22] = 0
        for (let i=0;i<savedata.userkeys.length;i++) {
            if (evt.key == savedata.userkeys[i]) {
                keyReleased(i+1)
            }
        }
    }
}

// function scoreNoise(steps) {
//     let noisereturned = []
//     noisereturned[0] = (Math.random()/(steps))
//     for (let i=1;i<steps;i++) {
//     }
//     return noisereturned
// }

function changeScore(added) {
    //let noisevals = scoreNoise(Math.round(Math.random()*5)+2)
    gamedata.score = gamedata.score + Math.floor(added)
    document.getElementById("totalscoretrack").innerHTML = `Score: ${gamedata.score}`
}
function resetScore() {
    gamedata.score = 0
    document.getElementById("totalscoretrack").innerHTML = `Score: ${gamedata.score}`
}
function increaseCombo() {
    gamedata.combo = gamedata.combo + 1
    combomulti = (1+(Math.sqrt(gamedata.combo)*0.02))
    document.getElementById("totalcombotrack").innerHTML = `Combo: ${gamedata.combo} (x${Math.floor(combomulti*100)/100})`
}
function resetCombo() {
    gamedata.combo = 0
    combomulti = 1
    document.getElementById("totalcombotrack").innerHTML = `Combo: ${gamedata.combo} (x${Math.floor(combomulti*100)/100})`
}

for (let i=1; i<=4; i++) {
    let object = document.body.appendChild(document.getElementById("objectstorer").getElementsByClassName("laneobject")[0].cloneNode())
    object.classList = `laneobject lanebeat lane${i}`
    object = document.body.appendChild(document.getElementById("objectstorer").getElementsByClassName("indicobject")[0].cloneNode())
    object.id = `indic${i}`
    object.innerHTML = `${savedata.userkeys[i-1]}`
}
function setUpSeconds() {
    document.getElementById("secondholder").innerHTML = ""
    for (let i=0;i<document.getElementById("musicplayer").duration+1;i++) {
        let object = document.getElementById("secondholder").appendChild(document.getElementById("objectstorer").getElementsByClassName("timeobject")[0].cloneNode())
        object.style.left = `${(i*pixelspersecond)+indicOffset}px`
        object.style.top = `20vh`
        object.classList = "timeobject timeobjectfin"
        object.id = `second${i}`
    }
}