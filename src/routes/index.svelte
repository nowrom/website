<script lang="ts" context="module">
	import type { ROMTypes } from '../types';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';
	import SvelteSeo from 'svelte-seo';
	import Rom from '$lib/components/rom.svelte';
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
	let brand = '';
	let count = 20;
	function updateSearch() {
		let r = search.search(toSearch);
		searchResults.length = 0;
		let t;
		if (toSearch == '') {
			t = [...devices];
		} else {
			t = [...r.map((x) => x.item)];
		}
		if (brand !== '') {
			t = t.filter((x) => x.brand?.toLowerCase() === brand.toLowerCase());
		}
		searchResults.push(...t);
	}
	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);
		toSearch = searchParams.get('search') || '';
		toSearch = searchParams.get('brand') || '';
		updateSearch();
	});
</script>

<SvelteSeo
	title="nowrom"
	description="The easiest way to find a rom to suit your needs"
	openGraph={{
		title: 'nowrom',
		description: 'The easiest way to find a rom to suit your needs',
		type: 'website'
	}}
	twitter={{
		title: 'nowrom',
		description: 'The easiest way to find a rom to suit your needs'
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
					<div
						class="p-2 rounded-md bg-teal-200 prose hover:prose-a:text-green-400 focus:prose-a:text-sky-600"
					>
						<p class="font-bold">Invite the nowrom bot</p>
						<ul dir="auto">
							<li>
								Telegram
								<a href="https://t.me/NowromBot" rel="nofollow">@NowromBot</a>
							</li>
							<li>
								Matrix
								<a href="https://matrix.to/#/@nowrom:matrix.org" rel="nofollow"
									>@nowrom:matrix.org</a
								>
							</li>
							<li>
								Discord
								<a
									href="https://discord.com/oauth2/authorize?client_id=890656612845518889&amp;permissions=117824&amp;scope=bot%20applications.commands"
									rel="nofollow">NowRom</a
								>
							</li>
						</ul>
						<p class="font-semibold"><a href="https://github.com/nowrom/bot">Bot Source</a></p>
					</div>
					<div class="p-2 rounded-md prose-teal prose bg-teal-200">
						<details>
							<summary>Contact me</summary>
							<div class="">
								<p>
									Hello im tricked you can contact me via my email: tricked@tricked.pro<br />
									for other ways to contact me please visit
									<a rel="noopener" target="_blank" href="https://tricked.pro/en">my site</a> thanks!
								</p>
							</div>
						</details>
					</div>
					<div class="p-2 rounded-md bg-teal-200 md:hidden">
						<a href="#search">Jump to search</a>
					</div>
				</div>
				<details class="bg-teal-100 rounded-md border-4 border-teal-100 p-0">
					<summary class="p-4">Display roms</summary>
					<div class="grid gap-4">
						{#each roms as rom}
							<Rom {rom} />
						{/each}
					</div>
				</details>
			</div>
		</div>

		<div class="max-w-full w-[80rem] p-4">
			<div class="flex md:flex-row flex-col gap-2">
				<input
					class="focus:border-teal-900 focus:rounded-md focus:outline-none text-neutral-900 text-lg border-2 border-teal-100 p-4 rounded-sm w-full bg-teal-200"
					id="search"
					placeholder="Search"
					bind:value={toSearch}
					on:input={() => {
						//Theres probably a better way to do this but idk how /shrug
						if (brand !== '') {
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
				<input
					class="focus:border-teal-900 focus:rounded-md focus:outline-none text-neutral-900 text-lg border-2 border-teal-100 p-4 rounded-sm md:w-96 w-full bg-teal-200"
					placeholder="Brand"
					bind:value={brand}
					on:input={() => {
						if (toSearch !== '') {
							const searchParams = new URLSearchParams(window.location.search);
							searchParams.set('brand', brand);
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
			</div>

			<div class="py-4 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-1 justify-evenly">
				{#if searchResults.length == 0}
					<div class="bg-teal-100 p-4 rounded-md border-4 border-teal-100 prose prose-teal">
						<p>No results to display</p>
					</div>
				{:else}
					{#each count !== -1 ? [...searchResults].slice(0, count) : searchResults as rom, index (rom.codename)}
						<div
							id={rom.codename}
							class="bg-teal-100 p-4 rounded-md border-4 border-teal-100 prose prose-teal flex flex-col"
						>
							<h3>{rom.name || 'Unknown'}</h3>
							<p class="text-teal-700">
								Brand: {rom.brand || 'Unknown'}
								<br />

								Codename: {rom.codename || 'Unknown'}
							</p>
							<p class="text-sm flex-grow">
								Supported roms: {#each rom.roms as rom}
									<a href={`#${rom.id}`}>{rom.id}</a>,{' '}
								{/each}
							</p>
							<div>
								<a target="_blank" rel="noopener" href={`/device/${rom.codename}`}>View device</a>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			{#if !(count > searchResults.length || count < 0)}
				<button
					class="bg-teal-300 p-4 rounded-md border-4 border-teal-300 prose prose-teal hover:bg-teal-600 focus:bg-teal-600 hover:border-teal-600 focus:border-teal-600"
					on:click={() => {
						console.log(count);
						count += 20;
					}}>Show More</button
				>
				<button
					class="bg-teal-300 p-4 rounded-md border-4 border-teal-300 prose prose-teal hover:bg-teal-600 focus:bg-teal-600 hover:border-teal-600 focus:border-teal-600"
					on:click={() => {
						count += -1 - count;
						console.log(count);
					}}>Show All</button
				>
			{/if}
		</div>
	</div>
</div>

<style>
</style>
