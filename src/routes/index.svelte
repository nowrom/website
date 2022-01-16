<script lang="ts" context="module">
	import type { ROMTypes } from '../types';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';
	import SvelteSeo from 'svelte-seo';

	export async function load({ params, fetch, session, stuff }) {
		const data = await fetch('https://nowrom.deno.dev/').then((r) => r.json());
		const roms = await fetch('https://nowrom.deno.dev/roms').then((r) => r.json());
		return {
			props: {
				devices: data,
				roms: roms
			}
		};
	}
</script>

<script lang="ts">
	export let devices: ROMTypes[];
	export let roms = [];
	let searchResults = [...devices];
	const search = new Fuse(devices, {
		keys: [
			'brand',
			'codename',
			{
				name: 'name',
				weight: 2
			}
		]
	});
	let toSearch = '';
	function updateSearch() {
		let r = search.search(toSearch);
		searchResults.length = 0;
		if (toSearch == '') {
			searchResults.push(...devices);
		} else {
			searchResults.push(...r.map((x) => x.item));
		}
	}
	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		toSearch = searchParams.get('search') || '';
		updateSearch();
	});
</script>

<SvelteSeo
	title="nowrom"
	description="The easiest way to find a rom to suit your needs"
	openGraph={{
		title: 'nowrom',
		description: 'The easiest way to find a rom to suit your needs',
		// url: 'https://www.example.com/page',
		type: 'website'
	}}
	twitter={{
		// site: "@username",
		title: 'nowrom',
		description: 'The easiest way to find a rom to suit your needs'
		// image: "https://www.example.com/images/cover.jpg",
		// imageAlt: "Alt text for the card!",
	}}
/>

<div class="mx-auto bg-gradient-to-b from-teal-700 to-teal-900">
	<div class="md:flex">
		<div class="md:p-0 p-4">
			<div class="grid gap-2 py-4">
				<div
					class="bg-teal-100 p-1 rounded-md border-4 border-teal-100 prose prose-teal grid gap-1"
				>
					<div class="p-2 rounded-md bg-teal-200">
						<strong>nowrom</strong> is a opensource project useful for finding compatible roms for
						your android device you can view the source code
						<a href="https://github.com/nowrom/website">here</a>
					</div>
					<div class="p-2 rounded-md bg-teal-200">
						For a the repo that contains all roms etc visit <a
							href="https://github.com/nowrom/devices">this</a
						>
					</div>
					<div class="p-2 rounded-md bg-teal-200 md:hidden">
						<a href="#search">Jump to search</a>
					</div>
				</div>
				{#each roms as rom}
					<div class="bg-teal-100 p-4 rounded-md border-4 border-teal-100 prose prose-teal">
						<h2 id={rom.id}>{rom.name}</h2>
						<p>{rom.about}</p>
						<ul>
							<li><a href={rom.website} target="_blank">Website</a></li>
							<li><a href={rom.wiki} target="_blank">Wiki</a></li>
							<li><a href={rom.download} target="_blank">Download</a></li>
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<div class="max-w-full w-[80rem] p-4">
			<input
				class="focus:border-teal-900 focus:rounded-md focus:outline-none text-neutral-900 text-lg border-2 border-teal-300 p-4 rounded-sm w-full bg-teal-200"
				id="search"
				placeholder="Search"
				bind:value={toSearch}
				on:input={() => {
					//Theres probably a better way to do this but idk how /shrug
					if (toSearch !== '') {
						const searchParams = new URLSearchParams(window.location.search);
						searchParams.set('search', toSearch);
						const newLoc = new URL(window.location.toString());
						newLoc.search = searchParams.toString();
						window.history.pushState({}, null, newLoc);
					} else {
						const newLoc = new URL(window.location.toString());
						newLoc.search = '';
						window.history.pushState({}, null, newLoc);
					}

					updateSearch();
				}}
			/>
			<div
				class="py-4 grid md:grid-cols-3 lg:md:grid-cols-5 sm:md:grid-cols-2 gap-1 justify-evenly"
			>
				{#if searchResults.length == 0}
					<div class="bg-teal-100 p-4 rounded-md border-4 border-teal-100 prose prose-teal">
						<p>No results to display</p>
					</div>
				{:else}
					{#each searchResults as rom}
						<div class="bg-teal-100 p-4 rounded-md border-4 border-teal-100 prose prose-teal">
							<h3>{rom.name || 'Unknown'}</h3>
							<p class="text-teal-700">
								Brand: {rom.brand || 'Unknown'}
								<br />

								Codename: {rom.codename || 'Unknown'}
							</p>
							<p class="text-sm">
								Supported roms: {#each rom.roms as rom}
									<a href={`#${rom.id}`}>{rom.id}</a>,{' '}
								{/each}
							</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
</style>
