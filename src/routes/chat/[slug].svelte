<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `/chat/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();
			return {
				props: {
					name: data.name,
					description: data.description,
					slug: page.params.slug
				}
			};
		}

		return {
			status: res.status
		};
	}

	import { browser } from '$app/env';
	export const hydrate = true;
	export const router = browser;
	export const prerender = false;
</script>

<script lang="ts">
	export let name: string;
	export let description: string;
	export let slug: string;

	import { dev } from '$app/env';
	import io, { Socket } from 'socket.io-client';
	import { onDestroy, onMount } from 'svelte';

	import { fade } from 'svelte/transition';
	import Chat from '../../lib/chat/Chat.svelte';

	let messages = [];
	let text: string;
	let client: Socket;

	onMount(() => {
		client = io(dev ? 'ws://localhost:1339' : 'wss://api.theres.care');
		client.emit('join room', slug);

		client.on('system message', (message) => {
			messages = [...messages, { type: 'system', text: message }];
		});

		client.on('message', (message) => {
			messages = [
				...messages,
				{
					type: 'user',
					author: message.author,
					text: message.text
				}
			];
		});

		client.on('private message', (from, to, message) => {
			if (from === client.id) {
				messages = [
					...messages,
					{
						type: 'privateTo',
						to,
						text: message
					}
				];
			}

			if (to === client.id) {
				messages = [
					...messages,
					{
						type: 'privateFrom',
						from,
						text: message
					}
				];
			}
		});

		client.on('disconnect', () => {
			messages = [
				...messages,
				{
					type: 'system',
					text: 'Lost connection to server.'
				}
			];
		});

		client.on('kick', (reason) => {
			messages = [
				...messages,
				{
					type: 'system',
					text: 'You have been kicked from the room: ' + reason
				}
			];
		});
	});

	onDestroy(() => {
		client?.disconnect();
	});

	function msg(text) {
		client.emit('message', text);
	}
</script>

<svelte:head>
	<title>{name} ~ Chat ~ there's care.</title>

	<meta property="og:title" content="{name} ~ Chat" />
	<meta property="og:description" content={description} />
</svelte:head>

<h1>{name}</h1>
<p>{description}</p>
<Chat bind:messages sendMessage={msg} />
