<script context="module">
	import Rom from '$lib/components/rom.svelte';
	export async function load({ params, fetch }) {
		const { device: devicename } = params;
		const device = await fetch(`/device/${devicename}.json`).then((r) => r.json());
		return {
			props: device
		};
	}
</script>

<script lang="ts">
	type Roms = Record<string, string>;
	export let device: Record<string, string> & { roms: Array<Record<string, string>> };

	export let roms: Roms[];
</script>

<div class="bg-teal-700 min-h-screen">
	<div class="flex p-4 gap-3">
		<h1 class="text-teal-200 text-4xl">{device.name}</h1>
		<h4 class="text-teal-300 text-xl">{device.codename}</h4>
	</div>
	<div class="flex justify-center max-w-[80rem] mx-auto gap-4 flex-col md:flex-row">
		<div>
			<div class="grid gap-2">
				<div class="bg-teal-400 p-4 rounded-md border-teal-400 h-auto md:w-96">
					<table class="relative">
						<tr class="text-3xl">
							<th class="m-auto">Device Info</th>
						</tr>
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
						{#each device.roms as rom}
							{#if rom.id == 'lineageos'}
								<tr>
									<td>
										<p>Ram</p>
									</td>
									<td>
										<p>{rom.ram}</p>
									</td>
								</tr>
								<tr>
									<td>
										<p>Cpu</p>
									</td>
									<td>
										<p>{rom.cpu}</p>
									</td>
								</tr>
							{/if}
						{/each}
						<tr class="flex justify-center">
							<td class="flex justify-center">
								<img
									src={`https://nowrom.deno.dev/img/${device.codename.toLowerCase()}.png`}
									alt=""
								/>
							</td>
						</tr>
					</table>
				</div>
				<div class="bg-teal-400 p-4 rounded-md border-teal-400 h-auto ">
					<a href="/" class="hover:text-fuchsia-700"> Back to search </a>
				</div>
			</div>
		</div>
		<div class="bg-teal-500 p-4 rounded-md border-teal-500 w-full">
			<div>
				<h2 class="text-3xl text-teal-900">Roms</h2>
				<div class="grid gap-2">
					{#each device.roms as rom (rom.id)}
						{@const romrom = roms.find((x) => x.id == rom.id)}

						<details class="p-2 bg-teal-400 rounded-md">
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
	</div>
</div>

<style lang="postcss">
	details summary::-webkit-details-marker,
	details summary::marker {
		display: none;
		content: '';
	}
</style>
