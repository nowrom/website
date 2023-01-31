export async function get() {
    let url = "https://nowrom.pages.dev"
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/xml'
	};
	return {
		body: `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"
                       xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>the easiest way to find a rom for your device</ShortName>
  <Description>Nowrom the easiest way to find a rom for your device</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="16" height="16"  type="image/png">${url}/nowrom.png</Image>
<Url type="text/html" method="get" template="${url}?search={searchTerms}"/>
  <moz:SearchForm>${url}</moz:SearchForm>
</OpenSearchDescription>`,
		headers
	};
}
//<Url type="application/x-suggestions+json" template="[suggestionURL]"/>
//