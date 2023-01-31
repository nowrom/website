export async function get() {
	

	const devices = await fetch('https://nowrom.deno.dev/').then((r) => r.json());

	const body = render(["/", "/about", "/roms"], devices);

	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/xml'
	};

	return {
		body,
		headers
	};
}

const render = (
	staticPages: Array<string>,
	devices: { name: string; brand: string; codename: string }[],
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>


${devices
	.filter((x) => !x.codename.includes('&'))
	.map(
		(device) => `
  <url>
    <loc>https://nowrom.pages.dev/device/${device.codename}</loc>
    <changefreq>daily</changefreq>
	<priority>0.80</priority>
  </url>
`
	)
	.join('')}

${staticPages
	.map(
		(staticPage) => `
  <url>
    <loc>${staticPage}</loc>
    <changefreq>weekly</changefreq>
	<priority>1</priority>
	</url>
`
	)
	.join('')}
</urlset>
`;