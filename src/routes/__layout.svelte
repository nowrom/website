<script>
	import '../app.css';
</script>

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
