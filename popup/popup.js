console.log("started");
console.log(chrome.storage.local.get("discord_token"));

let tokenArea = document.getElementById("token");
let registButton = document.getElementById("regist");
let postButton = document.getElementById("postAll");

function registToken() {
    token = tokenArea.value;
    chrome.storage.local.set({ discord_token: token }, function () {
        alert("登録しました" + token);
        console.log(chrome.storage.local.get("discord_token"));
        console.log(token);
    });
    tokenArea.value = "";
}

function loadCurrent() {
    chrome.windows.getCurrent({ populate: true }, function () {});
}

function postList(ary) {
    let { token } = chrome.storage.local.get("token");
    fetch(chrome.storage.local.get("token"), {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "BuntinChromeAPP",
            avatar_url: "https://cdn.discordapp.com/attachments/1026145551831543909/1026146054002966628/rusiaAhegao.png",
            // contents of the message to be sent
            content: "",
        }),
    });
}

registButton.addEventListener("click", registToken);
postButton.addEventListener("click", postList);
