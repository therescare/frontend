<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<svelte:head>
	<title>Wiki ~ there's care.</title>

	<meta property="og:title" content="Wiki" />
	<meta property="og:description" content="Browse various bits of information and resources." />
</svelte:head>

<h1>Wiki</h1>
<p>
	Welcome to the wiki. This wiki lets you find resources on various things, but please remember <b
		>this is not medical or professional advice</b
	>.

    <a href="/wiki/test">Go to the test page?</a>
</p>
