let savedata = null

savedata = {
    highscores: {
        song1: 0,
        song2: 0
    },
    totalscore: 0,
    rating: 0,
    userkeys: ["2","w","k","m"] // i dont actually know what keys to use...
}

function encrypt(string) {
    var post = CryptoJS.AES.encrypt(string, "mangosrhythmgame")
    return post.toString()
}
function decrypt(string) {
    var post = CryptoJS.AES.decrypt(string, "mangosrhythmgame")
    return post.toString(CryptoJS.enc.Utf8)
}