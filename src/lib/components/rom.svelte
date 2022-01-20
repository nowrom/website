<script>
	export let rom;
	export let title = true;
</script>

<div class="bg-teal-200 rounded-md border-4 p-4 border-teal-200 prose prose-teal">
	{#if title} <h2 id={rom.id}>{rom.name}</h2> {/if}
	<p>{rom.about}</p>
	<ul>
		<li><a href={rom.website} target="_blank">Website</a></li>
		<li><a href={rom.wiki} target="_blank">Wiki</a></li>
		<li><a href={rom.download} target="_blank">Download</a></li>
	</ul>
</div>
