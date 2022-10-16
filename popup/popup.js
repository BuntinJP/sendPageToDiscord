console.log("started");
console.log(chrome.storage.local.get("discord_token"));

let tokenArea = document.getElementById("token");
let registButton = document.getElementById("regist");
let postButton = document.getElementById("postAll");
const token = { test: "test" };
const message = { username: "ブラウザから", content: "fetch api を利用" };

async function postData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return await response.text();
}

/* postData(url, message)
    .then((data) => console.log(data))
    .catch((error) => console.error(error)); */

function registToken() {
	let token = tokenArea.value;
	chrome.storage.local.set({ discord_token: token }, function () {
		alert("登録しました");
	});
	tokenArea.value = "";
}

function loadCurrent() {
	chrome.windows.getCurrent({ populate: true }, function () {});
}

function postList() {
	console.log(chrome.storage.local.get("discord_token").text());
}

registButton.addEventListener("click", registToken);
postButton.addEventListener("click", postList);
