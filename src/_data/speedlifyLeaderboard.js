const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	let url = "https://www.11ty.dev/speedlify/api/urls.json";
	let json = await EleventyFetch(url, {
		duration: "1w",
		type: "json",
	});

	return json;
};