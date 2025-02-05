<script lang="ts">
	import ImageGrid from '$lib/ImageGrid.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ImageGrid images={data.images} />