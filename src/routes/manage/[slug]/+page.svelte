<script lang="ts">
	import { alertError, alertSuccess } from '$lib/Alerts.svelte';
	import { alerts } from '$lib/alerts.svelte';
	import ImageGrid from '$lib/ImageGrid.svelte';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data: propsData }: PageProps = $props();
	
	let data = $state(propsData)
	$effect(() => {
		data = propsData
	})

	const handleReq = async (name: string, newName?: string) => {
		const res = await fetch(`/api/image/${data.user}/${name}`, {
			method: newName ? "POST" : "DELETE",
			body: newName
		})	

		if (res.status !== 204)	{
			alerts.add(alertError, await res.text())
			return
		}

		if (newName) {
			const i = data.images.findIndex(v => {console.log(name, v.name, v.name === name); return v.name === name})
			if (!i) {
				alerts.add(alertError, "Couldn't update page properly, reloading...")
				location.reload()
				return
			}

			data.images[i].name = newName
		} else {
			data.images = data.images.filter(v => v.name !== name)
		}
	}
</script>

<ImageGrid images={data.images} editHandler={handleReq} deleteHandler={handleReq} openHandler={image => goto(image.thumbnail)}/>