<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `/chat.json`;
		const res = await fetch(url);

		if (res.ok) {
			const data = await res.json();
			return {
				props: data
			};
		}

		return {
			status: res.status
		};
	}

	import { dev } from '$app/env';
	export const hydrate = dev;
	export const router = true;
	export const prerender = false;
</script>

<script lang="ts">
	export let users: number;
	export let rooms: { name: string; description: string; userCount: number; slug: string }[];

	import { goto } from '$app/navigation';

	let createRoomError = '';

	let createRoomName = '';
	let createRoomDescription = '';

	async function createRoom(e) {
		e.preventDefault();

		if (!createRoomName) {
			return (createRoomError = 'You need a room name!');
		}

		const data = await fetch('/chat.json', {
			method: 'PUT',
			body: JSON.stringify({
				name: createRoomName,
				description: createRoomDescription
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json());

		console.log(data.id);

		await goto(`/chat/${data.id}`);
	}
</script>

<svelte:head>
	<title>Chat ~ there's care.</title>

	<meta property="og:title" content="Chat" />
	<meta property="og:description" content="Speak to others anonymously and safely." />
</svelte:head>

<h1>Chat</h1>
<p>
	Welcome to the anonymous chatrooms. We have a variety of topics here for you to find other people
	with! There are currently {users} users online.
</p>
<div class="form-group">
	<label class="paper-btn" for="createModal">Create private room</label>
</div>
<div id="rooms">
	{#each rooms as room}
		<a href="/chat/{room.slug}" class="room">
			<div class="card">
				<div class="card-body">
					<div
						class="float-right margin-none room-users"
						popover-left="There are {room.userCount} people in this room"
					>
						<img class="icon" src="/assets/img/eye.svg" alt="people viewing" />
						{room.userCount}
					</div>
					<h4 class="card-title">{room.name}</h4>

					<p class="card-text">{room.description}</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<input class="modal-state" id="createModal" type="checkbox" />

<div class="modal">
	<label class="modal-bg" for="createModal" />
	<div class="modal-body">
		<label class="btn-close" for="createModal">X</label>
		<h4 class="modal-title">Create private room</h4>
		<p class="modal-text">
			This will allow you to create a private room and share a link with your friends.
		</p>
		<form on:submit={createRoom}>
			<div class="form-group">
				<label for="roomName">Name*</label>
				<input
					type="text"
					id="roomName"
					class="input-block"
					placeholder="Room of good vibes 💖"
					bind:value={createRoomName}
				/>
			</div>
			<div class="form-group">
				<label for="roomDescription">Description</label>
				<textarea
					id="roomDescription"
					class="input-block"
					placeholder="A place to talk about good vibes and spreading that positive energy ✨"
					bind:value={createRoomDescription}
				/>
			</div>
			<p class="text-muted">* Required</p>
			<p class="text-danger">{createRoomError}</p>
			<input class="paper-btn" type="submit" value="Create" />
		</form>
	</div>
</div>

<style>
	.room {
		display: block;
		background-image: none;
		color: var(--primary);
	}

	.room:not(:last-child) {
		margin-bottom: 2rem;
	}

	[popover-left]:after {
		min-width: 150px;
		line-height: initial;
	}

	.room-users {
		line-height: 1.5rem;
	}

	.icon {
		display: inline;
		max-height: 20px;
		vertical-align: middle;
	}

	.float-right {
		float: right;
	}

	.card-text {
		margin-bottom: 0 !important;
	}
</style>
