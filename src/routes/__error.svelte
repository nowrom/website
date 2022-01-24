<script context="module">
	import Seo from '$lib/components/seo.svelte';
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
	export let status;
</script>

<Seo title={`${status == 404 ? 'Wrong page m8' : title} | nowrom`} />

<div class="prose prose-invert bg-slate-800 min-w-full min-h-screen">
	{#if status === 404}
		<h1>404 not found</h1>
		<p>Tried finding the right url :D</p>
	{:else}
		<h1>{title}</h1>
	{/if}

	<a href="/">Return back to main page</a>
	<!-- <p>Here take a frog instead</p>
	<img src="/frog.jpg" alt="frog" /> -->
</div>
