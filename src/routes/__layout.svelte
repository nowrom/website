<script>
	import { onMount } from 'svelte';
	import { browser, dev } from '$app/env';
	import '../app.css';

	let ReloadPrompt;
	onMount(async () => {
		!dev &&
			browser &&
			(ReloadPrompt = (await import('$lib/components/ReloadPrompt.svelte')).default);
	});
</script>

<svelte:head>
	{#if !dev && browser}
		<link rel="manifest" href="/_app/manifest.webmanifest" />
	{/if}
</svelte:head>

<slot />

<div class="bg-gray-800">
	<hr class="bg-gray-900 outline-gray-800 border-gray-700" />
	<ul class="flex md:flex-row flex-col md:gap-5 p-4">
		<li class="text-yellow-500">Nowrom</li>
		<li>
			<a class="text-blue-400 hover:text-blue-600 underline" href="/">Home</a>
		</li>
		<li>
			<a class="text-blue-400 hover:text-blue-600 underline" href="https://github.com/nowrom"
				>Github</a
			>
		</li>
	</ul>
</div>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
