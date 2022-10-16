let tokenArea = document.getElementById("token");
let registButton = document.getElementById("regist");
let postButton = document.getElementById("postAll");
let nameArea = document.getElementById("device-name");
let setNameButton = document.getElementById("setName");
let deviceName = "デバイスネーム未登録のChrome";

//deviceNameの取得
chrome.storage.local.get("device_name", function (result) {
	if (result.device_name) {
		deviceName = result.device_name;
		nameArea.value = deviceName;
	}
});

let URL = "";

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

const split = (array, n) =>
	array.reduce(
		(a, c, i) =>
			i % n === 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]],
		[],
	);

function registToken() {
	let token = tokenArea.value;
	chrome.storage.local.set({ discord_token: token }, function () {
		alert("登録しました");
	});
	tokenArea.value = "";
}

function post() {
	chrome.storage.local.get("discord_token", function (result) {
		URL = result.discord_token;
	});
	var tabs = chrome.tabs.query({ currentWindow: true });
	tabs.then((tabs) => {
		const embeds = convertTabToEmbed(tabs);
		const splitedEmbeds = split(embeds, 10);
		splitedEmbeds.forEach((embeds) => {
			console.log(embeds);
			postData(URL, {
				embeds: embeds,
			});
		});
	});
}

const convertTabToEmbed = (tabs) => {
	return tabs.map((tab) => {
		return {
			title: tab.title,
			description: tab.url,
			author: {
				name: deviceName,
				icon_url:
					"https://cdn.discordapp.com/attachments/1026145551831543909/1026146054917328986/rusiaAhegao-min_2.png",
			},
		};
	});
};

function setName() {
	deviceName = nameArea.value;
	chrome.storage.local.set({ device_name: deviceName }, function () {
		alert("登録しました");
	});
	nameArea.value = "deviceName";
}
/* , function (tabs) {
        tabs.forEach(function (tab) {
            postData(URL, { username: tab.title, content: tab.url });
        }); */
setNameButton.addEventListener("click", setName);
registButton.addEventListener("click", registToken);
postButton.addEventListener("click", post);
