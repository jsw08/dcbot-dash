<script lang="ts">
	import '../app.css';
	import {alerts} from "$lib/alerts.svelte"

	let { children } = $props();
</script>

{@render children()}

{#each alerts.alerts as alert}
	{@render alert.snippet(alert.text)}
{/each}