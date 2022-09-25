const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	let url = "https://smzr-speedlify.netlify.app/api/urls.json";
	let json = await EleventyFetch(url, {
		duration: "1w",
		type: "json",
	});

	return json;
};