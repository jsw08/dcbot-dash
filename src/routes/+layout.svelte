<script lang="ts">
	import '../app.css';
	import { alerts } from '$lib/alerts.svelte';
	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';

	let { children, data } = $props();
</script>

<div class="w-full p-5">
	<div class="navbar bg-base-200 shadow-lg rounded-lg">
		<div class="navbar-start">
			{#if page.data.session}
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button tabindex="0" class="btn btn-ghost btn-circle avatar">
						<img src={page.data.session.user?.image} class="rounded-full" alt="Profile" />
					</button>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<ul
						tabindex="0"
						class="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-4 ml-2 p-2 shadow"
					>
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<a
							class="btn btn-square btn-soft"
							href="/#signout"
							onclick={(_) => signOut({ redirect: true, callbackUrl: '/' })}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
								/></svg
							>
						</a>
					</ul>
				</div>
			{:else}
				<button class="btn btn-ghost" onclick={(_) => signIn('discord')}>
					<div class="indicator">Sign In</div>
				</button>
			{/if}
		</div>
		<div class="navbar-center">
			<a class="btn btn-ghost text-xl" href="/">Home</a>
			<a class="btn btn-ghost text-xl" href="/select">Users</a>
		</div>
		{#if data.users}
			<div class="navbar-end">
				<select class="select max-w-50 min-w-30" onchange={v => goto(v.currentTarget.value)}>
					<option selected={page.params.slug === undefined} value="/select">View a user.</option>
					{#each data.users as user}
						<option value="/manage/{user}" selected={page.params.slug === user}>{user.charAt(0).toUpperCase() + user.slice(1)}</option>
					{/each}
				</select>
			</div>
		{:else}
			<div class="navbar-end">

			</div>
		{/if}
	</div>
</div>

<div class="absolute top-0 right-0 z-10 p-5" class:hidden={alerts.alerts.length < 1}>
	{#each alerts.alerts as alert}
		{@render alert.snippet(alert.text)}
	{/each}
</div>

{@render children()}
