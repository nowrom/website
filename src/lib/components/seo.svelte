<script lang="ts">
	import SvelteSeo from 'svelte-seo';

	export let title = 'nowrom';
	export let image: undefined | string = undefined;
	export let description = 'The easiest way to find a rom to suit your needs';
	export let site_name = undefined;
</script>

{#if site_name}
	<meta property="og:site_name" content={site_name} />
{/if}

<SvelteSeo
	{title}
	{description}
	openGraph={{
		title: title,
		description: description,
		images: [
			{
				url: image
			}
		],
		type: 'website'
	}}
	twitter={{
		title: title,
		description: description,
		image: image
	}}
/>
