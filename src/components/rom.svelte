<script>
	export let rom;
	export let title = true;
</script>

<div class="bg-secondary/20 rounded-md p-4 prose prose-invert">
	{#if title} <h2 id={rom.id}>{rom.name}</h2> {/if}
	<p>{rom.about}</p>
	<ul>
		<li>
			<a
				class="link link-accent link-hover"
				href={rom.website}
				target="_blank"
				rel="noreferrer">Website</a
			>
		</li>
		<li>
			<a
				class="link link-accent link-hover"
				href={rom.wiki}
				target="_blank"
				rel="noreferrer">Wiki</a
			>
		</li>
		<li>
			<a
				class="link link-accent link-hover"
				href={rom.download}
				target="_blank"
				rel="noreferrer">Download</a
			>
		</li>
	</ul>
</div>
