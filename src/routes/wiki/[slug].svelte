<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `/wiki/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();
			return {
				props: {
					title: data.title,
					markdown: data.markdown,
					shortDescription: data.shortDescription,
					lastUpdated: data.lastUpdated,
					author: data.author
				}
			};
		}

		return {
			status: res.status
		};
	}

	import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = false;
</script>

<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';

	dayjs.extend(relativeTime);

	export let title: string;
	export let markdown: string;
	export let shortDescription: string;
	export let author: string;
	export let lastUpdated: string;
</script>

<svelte:head>
	<title>{title} ~ Wiki ~ there's care.</title>

	<meta property="og:title" content="{title} ~ Wiki" />
	<meta property="og:description" content={shortDescription} />
</svelte:head>

<h1>{title}</h1>
<p>{shortDescription} <span class="text-muted"> Written by {author}. Last updated {dayjs(lastUpdated).fromNow()}.</span></p>
<SvelteMarkdown source={markdown} />
