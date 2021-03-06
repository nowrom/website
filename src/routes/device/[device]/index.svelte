<script context="module" lang="ts">
	import { page } from '$app/stores';

	import Rom from '$lib/components/rom.svelte';
	import Seo from '$lib/components/seo.svelte';

	import type { Handle, Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export const router = false;
	export const hydrate = false;
	//@ts-ignore -
	export const load: Load = async ({ params, fetch, session }) => {
		const { device: devicename } = params;
		const device = await fetch(`https://nowrom.deno.dev/device/${devicename}.json`).then((r) =>
			r.json()
		);

		if (Object.entries(device).length === 0) {
			return {
				status: 404
			};
		}
		device.discord = session.userAgent?.toLowerCase().includes('discord');
		return {
			props: device
		};
	};
</script>

<script lang="ts">
	// import { page } from '$app/stores';

	type Roms = Record<string, string>;
	export let device: Record<string, string> & {
		roms: Array<Record<string, string>>;
		recoveries: Array<Record<string, string>>;
	};

	export let roms: Roms[];
	export let discord: boolean;
	const emojis = ['📚', '🔮', '🐟', '📱'];
	const rows = [`Codename: ${device.codename}`, `Brand: ${device.brand}`];
	if (device.roms.length !== 0) {
		rows.push(`Custom roms: ${device.roms.map((x) => x.id).join(', ')}`);
	}
	if (device.recoveries) {
		rows.push(`Recoveries: ${device.recoveries.map((x) => x.id).join(', ')}`);
	}
	const modiRows = discord ? rows.map((x, index) => `${emojis[index]} ${x}`) : rows;
	const renames = {
		cpu: 'CPU',
		weight: 'Weight',
		year: 'Year',
		os: 'OS',
		chipset: 'Chipset',
		gpu: 'GPU',
		sensors: 'Sensors',
		batlife: 'Battery',
		internalmemory: 'Memory'
	};
	//@ts-ignore -
	if (device.specs && device.specs.gpu !== 'Not found') {
		//@ts-ignore -
		const specs: Record<string, string> = device.specs;

		modiRows.push('');
		modiRows.push(...Object.entries(specs).map(([x, y]) => `${renames[x]}: ${y}`));
	}
	$: canshare = false;
	onMount(() => {
		canshare = navigator.canShare?.({
			url: $page.url.toString(),
			title: `${device.name} | nowrom`,
			text: 'Find the rom for your needs with nowrom!'
		});
	});
</script>

<svelte:head>
	<meta
		property="og:description"
		content="{modiRows.join(
			`
`
		)} "
	/>
	<meta
		property="twitter:description"
		content="{modiRows.join(
			`
`
		)} "
	/>
	<meta
		property="description"
		content="{modiRows.join(
			`
`
		)} "
	/>
</svelte:head>
<Seo
	title={`${device.name} | nowrom`}
	image={`https://hdabbjaktgetmyexzjtf.supabase.in/storage/v1/object/public/devices/${device.codename.toLowerCase()}.png`}
	description={null}
	site_name="Nowrom"
	keywords={`rom, customrom, find, phone, android, ${device.name}, ${device.codename}, ${device.roms
		.map((rom) => {
			let r = roms.find((x) => x.id == rom.id);
			return r?.name;
		})
		.filter((x) => x)
		.join(', ')}`}
/>

<div class="bg-slate-700 min-h-screen mb-10">
	<div class="flex p-4 gap-3">
		<h1 class="text-slate-200 text-4xl">{device.name}</h1>
		<h4 class="text-slate-300 text-xl">{device.codename}</h4>
	</div>
	<div class="flex justify-center max-w-[80rem] mx-auto gap-4 flex-col md:flex-row">
		<div>
			<div class="grid gap-2">
				<div class="bg-sky-800 p-4 rounded-md border-sky-800 h-auto md:w-96 text-stone-300">
					<div class="text-3xl text-center">
						<th class="m-auto">Device Info</th>
					</div>
					<table class="relative w-full">
						<tr>
							<td>
								<p>Brand</p>
							</td>
							<td>
								<p>{device.brand}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>codename</p>
							</td>
							<td>
								<p>{device.codename}</p>
							</td>
						</tr>
					</table>
					<table class="relative w-full">
						{#if device.specs}
							<!-- {@const specs = Object.entries(device.specs)} -->
							{#each Object.entries(device.specs) as [k, v]}
								<tr class="bg-slate-600 my-1 p-2 flex flex-col">
									<td>
										<p class="text-xl">{renames[k]}</p>
									</td>
									<td>
										<p>{v}</p>
									</td>
								</tr>
							{/each}
						{/if}
					</table>
					<div class="flex justify-center w-full">
						<img src={`https://nowrom.deno.dev/img/${device.codename.toLowerCase()}.png`} alt="" />
					</div>
				</div>
				{#if canshare}
					<button
						class="bg-slate-300 p-4 rounded-md border-4 border-slate-300 hover:bg-slate-600 focus:bg-slate-600 hover:border-slate-600 focus:border-slate-600"
						on:click={() => {
							navigator.share({
								url: $page.url.toString(),
								title: `${device.name} | nowrom`,
								text: 'Find the rom for your needs with nowrom!'
							});
						}}>Share Link</button
					>
				{/if}
				<div class="bg-sky-800 p-4 rounded-md border-sky-800 h-auto text-stone-300 md:w-96">
					<a href="/" class="hover:text-fuchsia-700"> Back to search </a>
				</div>
			</div>
		</div>
		<div class="w-full flex flex-col gap-2">
			<div class="bg-sky-700 p-4 rounded-md w-full">
				<div>
					<h2 class="text-3xl text-slate-200">Roms</h2>
					<p class="text-white">
						Custom roms for the <strong class="text-green-400">{device.name}</strong>: {device.roms
							.map((rom) => {
								let r = roms.find((x) => x.id == rom.id);
								return r?.name;
							})
							.filter((x) => x)
							.join(', ')}.<br />
						You can view the list down below to download these roms and find more information about them.
						<br />
						<a href="/" class="hover:text-fuchsia-700 text-blue-400"> Back to search </a>
					</p>
					<div class="grid gap-2 text-neutral-300">
						{#each device.roms as rom (rom.id)}
							{@const romrom = roms.find((x) => x.id == rom.id)}

							<details class="p-2 bg-slate-500 rounded-md">
								<summary>
									<h4 class="text-2xl">
										{rom.id}
									</h4>
									<div>
										{#if rom.id == 'lineageos'}
											<p>
												<a
													class="text-fuchsia-600 hover:text-fuchsia-700 underline"
													href={`https://wiki.lineageos.org/devices/${device.codename}/`}
													>Lineage Wiki page</a
												>
											</p>
										{/if}
										{#each Object.entries(rom) as [k, v]}
											{#if k == 'guide'}
												<p>
													<a class="text-fuchsia-600 hover:text-fuchsia-700 underline" href={v}
														>Guide</a
													>
												</p>
											{:else if k == 'url' || k == 'download'}
												<p>
													<a class="text-fuchsia-600 hover:text-fuchsia-700 underline" href={v}
														>Url/Download</a
													>
												</p>
											{:else if k == 'active'}
												<p>
													Active: {v}
												</p>
											{:else if k == 'maintainer'}
												<p>
													Maintainer: {v}
												</p>
											{:else if k == 'group'}
												<p>
													<a class="text-fuchsia-600 hover:text-fuchsia-700 underline" href={v}
														>Group</a
													>
												</p>
											{/if}
										{/each}
									</div>
								</summary>
								{#if romrom}
									<div class="py-2">
										<Rom rom={romrom} title={false} />
									</div>
								{:else}
									<div>
										<p>Rom not found!</p>
									</div>
								{/if}
							</details>
						{/each}
					</div>
				</div>
			</div>
			<div class="bg-sky-700 p-4 rounded-md w-full grid gap-2 text-neutral-300">
				<h2 class="text-3xl text-slate-200">Recoveries</h2>
				<p>
					Recoveries that officially support the {device.name} if theres no official recovery for the
					{device.name} then you should search for it.
				</p>
				{#each device.recoveries as recovery}
					<div class="p-2 bg-slate-500 rounded-md">
						{recovery.id}
					</div>
				{/each}
				{#if device.recoveries.length == 0}
					<div class="p-2 bg-slate-500 rounded-md">
						Device doesnt have offecialy suported recoveries
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	details summary::-webkit-details-marker,
	details summary::marker {
		display: none;
		content: '';
	}
</style>
