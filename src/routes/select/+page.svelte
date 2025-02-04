<script lang="ts">
	import type { PageProps } from './$types';
	import Masonary from '$lib/Masonary.svelte';

	let { data }: PageProps = $props();
	let update = $state(() => {});
</script>

{#snippet card(props: typeof data["images"][number])}
	<div class="p-3 m-2 rounded-xl shadow-xl bg-base-200 hover:[&>div]:visible">
		<div class="hidden">
			hi
		</div>
		<img
			src={props.thumbnail ? `/sexy/${props.name}/${props?.thumbnail}` : '/empty.png'}
			alt={props.name}
			onload={update}
			class="w-full rounded-xl"
		/>
	</div>
{/snippet}
{#snippet preload(props: typeof data["images"][number])}
	<link rel="preload" href={props.thumbnail ? `/sexy/${props.name}/${props?.thumbnail}` : '/empty.png'} as="image" />
{/snippet}


<div class="w-full h-screen flex justify-center items-center">
	<Masonary item={card} items={data.images} preloadItem={preload} columnWidth="w-3xs sm:w-xs lg:w-md xl:w-lg" bind:update={update}/>
</div>