<script lang="ts">
	import '../app.css';
	import {alerts} from "$lib/alerts.svelte"

	let { children } = $props();
</script>

{@render children()}

<div class="absolute top-0 right-0 z-10 p-5">
	{#each alerts.alerts as alert}
		{@render alert.snippet(alert.text)}
	{/each}
</div>
