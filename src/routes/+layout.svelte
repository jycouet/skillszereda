<script lang="ts">
	import { remult } from 'remult';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	// set this globaly
	$: remult.user = data.user;
</script>

<svelte:head>
	<title>Skillszereda</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
</svelte:head>

<div class="content">
	<slot />
</div>

<div class="footer">
	<hr />
	<em>© Dynamic Process {new Date().getFullYear()}</em>
</div>

<style>
	.content {
		flex: 1 0 auto;
	}
	.footer {
		margin: 1rem;
		flex-shrink: 0;
	}
</style>
