
function registToken() {
	chrome.storage.local.set({ "token": tokenArea.value }, function () {
		alert("登録しました");
	});
}

function loadCurrent() {
	chrome.windows.getCurrent({ populate: true }, function () {});
}

function postList(ary) {
    fetch(
        chrome.storage.local.get("token"), 
        {
          method: 'post',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify({
            username: 'BuntinChromeAPP',
            avatar_url:
              'https://cdn.discordapp.com/attachments/1026145551831543909/1026146054002966628/rusiaAhegao.png',
            // contents of the message to be sent
            content:"おまんこ",
          }),
        }
      );
}

const tokenArea = document.getElementById("token");
const registButton = document.getElementById("regist");
const postButton = document.getElementById("postAll");

registButton.addEventListener("click", registToken);
postButton.addEventListener("click", postList([]));
