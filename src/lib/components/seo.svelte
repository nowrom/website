<script lang="ts">
	import SvelteSeo from 'svelte-seo';

	export let title = 'nowrom';
	export let image: undefined | string = undefined;
</script>

<SvelteSeo
	{title}
	description="The easiest way to find a rom to suit your needs"
	openGraph={{
		title: title,
		description: 'The easiest way to find a rom to suit your needs',
		images: [
			{
				url: image
			}
		],
		type: 'website'
	}}
	twitter={{
		title: title,
		description: 'The easiest way to find a rom to suit your needs',
		image: image
	}}
/>
