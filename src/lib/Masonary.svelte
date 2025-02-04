<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		columnWidth?: string;
		update?: () => void;
		items: T[];
		item: Snippet<[T]>;
		preloadItem?: Snippet<[T]>;
	}

	let {
		columnWidth = 'w-96',
		update = $bindable(() => {}),
		items,
		item,
		preloadItem
	}: Props = $props();
	let columns = $state(0);
	let loading = $state(true);
	let columnWidthPx = $state(200);

	update = () => {
		if (loading) loading = false;
		columns = Math.floor(innerWidth / columnWidthPx) ?? 1;
	};
	$effect(update);
</script>

<svelte:window onresize={update} />

{#if loading}
	Loading..

	{#each items as value}
		{@render preloadItem?.(value)}
	{/each}
{:else}
	<div class="h-full overflow-y-auto p-5" style:width="{columnWidthPx * columns}px">
		<div style:column-count={columns}>
			{#each items as value}
				<div class="inline-block break-inside-avoid {columnWidth}" bind:offsetWidth={columnWidthPx}>
					{@render item(value)}
				</div>
			{/each}
		</div>
	</div>
{/if}
