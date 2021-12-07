<script context="module" lang="ts">
	export function load({ status }) {
		return {
			props: {
				status
			}
		};
	}

	import { browser, dev } from '$app/env';
	import { onMount } from 'svelte';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	export let status: number;

	const error =
		status === 404
			? 'We were unable to find what you were looking for.'
			: status === 500
			? 'An internal error has occurred.'
			: 'An unknown error has occurred.';

    let link = '/';
	onMount(() => {
		const ref = document.referrer;
		link = ref.length > 0 ? ref : '/';
	});
</script>

<svelte:head>
	<title>{status} ~ there's care.</title>

	<meta property="og:title" content={status.toString()} />
	<meta property="og:description" content={error} />
</svelte:head>

<h1>Uh oh!</h1>
<p>{error}</p>
<p>Try <a href={link}>going back</a>?</p>
