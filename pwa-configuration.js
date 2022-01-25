const pwaConfiguration = {
	srcDir: './.svelte-kit/cloudflare',
	outDir: './.svelte-kit/output/client',
	mode: 'production',
	includeManifestIcons: false,
	scope: '/',
	base: '/',
	manifest: {
		short_name: 'Nowrom',
		name: 'Nowrom Rom finder',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		theme_color: '#50e3c2',
		background_color: '#4a4a4a',
		icons: [
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/icon-256x256.png',
				sizes: '256x256',
				type: 'image/png'
			},
			{
				src: '/icon-384x384.png',
				sizes: '384x384',
				type: 'image/png'
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable'
			}
		]
	}
};

const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';
const sw = true;
const replaceOptions = {
	__DATE__: new Date().toISOString(),
	__RELOAD_SW__: reload ? 'true' : 'false'
};

const workboxOrInjectManifestEntry = {
	// vite and SvelteKit are not aligned: pwa plugin will use /\.[a-f0-9]{8}\./ by default: #164 optimize workbox work
	dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
	globDirectory: './build/',
	globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
	globIgnores: sw ? (claims ? ['**/claims-sw*'] : ['**/prompt-sw*']) : ['**/sw*', '**/workbox-*'],
	// Before generating the service worker, manifestTransforms entry will allow us to transform the resulting precache manifest. See the manifestTransforms docs for mode details.
	manifestTransforms: [
		async (entries) => {
			// manifest.webmanifest is added always by pwa plugin, so we remove it.
			// EXCLUDE from the sw precache sw and workbox-*
			const manifest = entries
				.filter(
					({ url }) =>
						url !== 'manifest.webmanifest' && !url.endsWith('sw.js') && !url.startsWith('workbox-')
				)
				.map((e) => {
					let url = e.url;
					if (url && url.endsWith('.html')) {
						if (url.startsWith('/')) url = url.slice(1);

						e.url = url === 'index.html' ? '/' : `/${url.substring(0, url.lastIndexOf('/'))}`;
						console.log(`${url} => ${e.url}`);
					}

					return e;
				});
			return { manifest };
		}
	]
};

if (sw) {
	pwaConfiguration.srcDir = 'src';
	pwaConfiguration.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
	pwaConfiguration.strategies = 'injectManifest';
	pwaConfiguration.manifest.name = 'Nowrom the easiest way to find a rom';
	pwaConfiguration.manifest.short_name = 'Nowrom';
	pwaConfiguration.injectManifest = workboxOrInjectManifestEntry;
} else {
	workboxOrInjectManifestEntry.mode = 'development';
	workboxOrInjectManifestEntry.navigateFallback = '/';
	pwaConfiguration.workbox = workboxOrInjectManifestEntry;
}

if (claims) pwaConfiguration.registerType = 'autoUpdate';

export { pwaConfiguration, replaceOptions };
