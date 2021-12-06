<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import logo from '$lib/logo.svg';
</script>

<svelte:head>
	<title>Home ~ there's care.</title>

	<meta property="og:title" content="Home" />
	<meta property="og:description" content="Because people do care in the world." />
</svelte:head>

<p>
	Hi there, welcome to
	<img
		src={logo}
		class="no-border no-responsive"
		style="height: 20px; vertical-align: middle"
		alt="there's care. monogram"
	/>
	<b>there's care</b>. This is a little site built to help centralise mental health resources and
	make it easier for people to vent their problems to others safely and anonymously. The only way
	someone can identify you is by you saying who you are. We don't store or release any personal
	information.
</p>
<p>What can we do for you?</p>
<div class="row child-borders flex-center">
	<a href="/wiki" class="paper-btn margin">Find some resources</a>
	<a href="#not-yet!" class="paper-btn disabled margin">Chat with others (not finished)</a>
	<a href="/everything-okay" class="paper-btn margin btn-danger-outline">I'm not doing okay</a>
</div>
