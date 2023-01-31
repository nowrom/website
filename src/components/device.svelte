<script lang="ts">
	import Rom from "./rom.svelte"
	type Roms = Record<string, string>;
	export let device: Record<string, string> & {
		roms: Array<Record<string, string>>;
		recoveries: Array<Record<string, string>>;
	};
	export let roms: Roms[];
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
	} as Record<string,string>;
</script>

<div class="min-h-screen mb-10">
	<div class="flex p-4 gap-3">
		<h1 class="text-4xl">{device.name}</h1>
		<h4 class="text-xl">{device.codename}</h4>
	</div>
	<div class="flex justify-center max-w-[80rem] mx-auto gap-4 flex-col md:flex-row">
		<div>
			<div class="grid gap-2">
				<div class="bg-base-300 p-4 rounded-md h-auto md:w-96 text-stone-300">
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
							{#each Object.entries(device.specs).filter(x=>x[1] != "Not found") as [k, v]}
								<tr class="bg-accent/20 my-1 p-2 flex flex-col">
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
						<img src={`https://nowrom.deno.dev/img/${device.codename?.toLowerCase()}.png`} alt="" />
					</div>
				</div>
			
				<div class="bg-base-300 p-4 rounded-md h-auto text-stone-300 md:w-96">
					<a href="/" class="link link-accent link-hover">Back to search</a>
				</div>
			</div>
		</div>
		<div class="w-full flex flex-col gap-2">
			<div class="bg-primary/30 p-4 rounded-md w-full">
				<article>
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
						<a href="/" class="link link-hover link-primary"> Back to search </a>
					</p>
					<div class="grid gap-2 text-neutral-300">
						{#each device.roms as rom (rom.id)}
							{@const romrom = roms.find((x) => x.id == rom.id)}

							<details class="p-2 bg-accent/20 rounded-md">
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
				</article>
			</div>
			<div class="bg-primary/30 p-4 rounded-md w-full grid gap-2 text-neutral-300">
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
				{#if device.recoveries?.length == 0}
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