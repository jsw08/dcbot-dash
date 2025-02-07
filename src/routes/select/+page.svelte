<script lang="ts">
	import { page } from '$app/state';
	import { alertError, alertSuccess } from '$lib/Alerts.svelte';
	import { alerts } from '$lib/alerts.svelte';
	import ImageGrid from '$lib/ImageGrid.svelte';
	import type { PageProps } from './$types';

	let { data: propData }: PageProps = $props();
	let data = $state(propData)

	const handleReq = async (name: string, newName?: string) => {
		const res = await fetch(`/api/user/${name}`, {
			method: newName ? 'POST' : 'DELETE',
			body: newName
		});

		if (res.status !== 204) {
			alerts.add(alertError, await res.text());
			return;
		}

		if (newName) {
			const i = data.images.findIndex(v =>  v.name === name)

			if (i === undefined) {
				alerts.add(alertError, "Couldn't update page properly, reloading...")
				return
			}

			data.images[i].name = newName
		} else {
			data.images = data.images.filter(v => v.name !== name)
		}
	};
</script>

<ImageGrid images={data.images} editHandler={handleReq} deleteHandler={handleReq} />
