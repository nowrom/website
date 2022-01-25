export async function get({ url }) {
	const headers = {
		'Content-Type': 'text/plain'
	};
	return {
		body: `User-agent: *
Allow: /

Sitemap: ${url.origin}/sitemap.xml`,
		headers
	};
}
//<Url type="application/x-suggestions+json" template="[suggestionURL]"/>
//
