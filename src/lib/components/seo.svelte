<script>
	import SvelteSeo from 'svelte-seo';

	export let title = 'nowrom';
</script>

<SvelteSeo
	{title}
	description="The easiest way to find a rom to suit your needs"
	openGraph={{
		title: title,
		description: 'The easiest way to find a rom to suit your needs',
		type: 'website'
	}}
	twitter={{
		title: title,
		description: 'The easiest way to find a rom to suit your needs'
	}}
/>
