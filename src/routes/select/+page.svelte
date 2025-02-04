<script lang="ts">
	import type { PageProps } from './$types';
	import Masonary from '$lib/Masonary.svelte';
	import { goto } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import type { EventHandler, FormEventHandler } from 'svelte/elements';

	type Image = typeof data["images"][number]

	let { data }: PageProps = $props();
	let update = $state(() => {});

	const alerts: {snippet: Snippet<[string]>, text: string}[] = []
	if (data.images.length > 0) alerts.push({snippet: alertError, text: "Error! No sexy images found."})

	let editModal: {open: boolean, name: string, value: string} = $state({open: true, name: "", value: ""})
	const openEditModal = (props: Image) => editModal = {
			open: true,
			name: props.name,
			value: props.name
		};
	const cancelEditModal: EventHandler<MouseEvent> = (e) => {
		e.preventDefault();
		editModal = {open: false, name: "", value: ""}
	}
	const submitEditModal: EventHandler<SubmitEvent> = (e) => {
		alert(`${editModal.name}, ${editModal.value}`)
		editModal = {open: false, name: "", value: ""}
	}

</script>

{#snippet imageItem(props: Image)}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="p-3 m-2 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:cursor-pointer transition bg-base-300 relative" onclick={_ => goto(`/manage/${props.name}`)}>
		<span class="absolute left-0 bottom-0 m-5 badge badge-xl">
			{props.name.charAt(0).toUpperCase() + props.name.slice(1)}
		</span>
		<div class="absolute right-0 top-0 m-3 dropdown dropdown-bottom dropdown-center" style="z-index: 50" onclick={e => e.stopPropagation()}>
			<div tabindex="0" role="button" class="btn btn-circle btn-soft m-1" >
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 13c0 1.11-.89 2-2 2H4a2 2 0 1 1 0-4h9l2.5 2l2.5-2h2a2 2 0 0 1 2 2M12 3C3 3 3 9 3 9h18s0-6-9-6M3 18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3v-1H3z"/></svg>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box p-2 shadow-sm">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<li><button class="btn btn-square mb-2" onclick={_ => openEditModal(props)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m21.7 13.58l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1l2.05 2.05l1-1a.55.55 0 0 0 0-.77M12 22h2.06l6.05-6.07l-2.05-2.05L12 19.94zm-2-1H5c-.53 0-1.04-.21-1.41-.59C3.21 20.04 3 19.53 3 19V5c0-.53.21-1.04.59-1.41C3.96 3.21 4.47 3 5 3h14a2 2 0 0 1 2 2v5.33a2.57 2.57 0 0 0-2 .03V5H5v14h5.11l-.11.11zm4.62-6.5L12.11 17H7.5v-.75c0-1.5 3-2.25 4.5-2.25c.7 0 1.73.16 2.62.5m-1.03-2.91c-.42.41-.99.66-1.59.66s-1.17-.25-1.59-.66A2.3 2.3 0 0 1 9.75 10c0-.6.25-1.17.66-1.59c.42-.41.99-.66 1.59-.66s1.17.25 1.59.66c.41.42.66.99.66 1.59s-.25 1.17-.66 1.59"/></svg></button></li>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<li><button class="btn btn-square"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button></li>
			</ul>
		</div>
		<img
			src={props.thumbnail ? `/sexy/${props.name}/${props?.thumbnail}` : '/empty.png'}
			alt={props.name}
			onload={update}
			class="w-full rounded-xl"
		/>
	</div>
{/snippet}
{#snippet preload(props: Image)}
	<link rel="preload" href={props.thumbnail ? `/sexy/${props.name}/${props?.thumbnail}` : '/empty.png'} as="image" />
{/snippet}
{#snippet alertError(text: string)}
	<div role="alert" class="alert alert-error max-w-96 float-right m-4">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>{alertError}</span>
	</div>
{/snippet}


{#if data.images.length > 0}
	<div class="w-full h-screen flex justify-center items-center">
		<Masonary item={imageItem} items={data.images} preloadItem={preload} columnWidth="w-3xs sm:w-xs lg:w-md xl:w-lg" bind:update={update}/>
	</div>
{/if}

{#each alerts as alert}
	{@render alert.snippet(alert.text)}
{/each}

<dialog class="modal" open={editModal.open}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Editing {editModal.name}</h3>
		<p class="py-4">Fill in a descriptive name of the image.</p>
		<form class="modal-action w-full" method="dialog" onsubmit={submitEditModal}>
			<!-- if there is a button in form, it will close the modal -->
			<input type="text" class="input w-full" bind:value={editModal.value}>
			<button class="btn" onclick={cancelEditModal}>Cancel</button>
			<button class="btn btn-primary">Submit</button>
		</form>
	</div>
</dialog>