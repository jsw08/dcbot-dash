<script lang="ts">
	import { page } from '$app/state';
	import { alertError, alertSuccess } from '$lib/Alerts.svelte';
	import { alerts } from '$lib/alerts.svelte';
	import ImageGrid from '$lib/ImageGrid.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const handleReq = async (user: string, newName?: string) => {
		const res = await fetch(`/api/user/${user}`, {
			method: newName ? "POST" : "DELETE",
			body: newName
		})	

		if (res.status !== 204)	{
			alerts.add(alertError, await res.text())
			return
		}

		alerts.add(alertSuccess, "Operation completed successfully, reloading...")
		setTimeout(location.reload, 2000)
	}
</script>

<ImageGrid images={data.images} editHandler={handleReq} deleteHandler={handleReq}/>