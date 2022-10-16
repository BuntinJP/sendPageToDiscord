console.log("started");
console.log(chrome.storage.local.get("discord_token"));

let tokenArea = document.getElementById("token");
let registButton = document.getElementById("regist");
let postButton = document.getElementById("postAll");
const message = { username: "ブラウザから", content: "fetch api を利用" };
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
			postData(URL, {embeds: embeds});
		});
	});
}

const convertTabToEmbed = (tabs) => {
	return tabs.map((tab) => {
		return {
			title: tab.title,
			url: tab.url,
			//description: "`" + tab.url + "`",
			//author: { name: tab.title, url: tab.url, icon_url: tab.favIconUrl },
		};
	});
};
/* , function (tabs) {
        tabs.forEach(function (tab) {
            postData(URL, { username: tab.title, content: tab.url });
        }); */

registButton.addEventListener("click", registToken);
postButton.addEventListener("click", post);
