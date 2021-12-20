<script context="module" lang="ts">
	export const prerender = false; // don't prerender this page, it needs that code param
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { apiBase } from '$lib/api';
	import { user } from '../stores';

	let data;

	async function getInfo() {
		const code = $page.query.get('code');
		if (!code) throw new Error('No code');

		const res = await fetch(`${apiBase}/users/verify/${code}`);
		if (!res.ok) throw new Error('Bad code');

		window.history.replaceState(null, null, '/register');

		const { email } = await res.json();
		return (data = { email, code });
	}

	let password = '';
	async function submit(e: Event) {
		e.preventDefault();

		const res = await fetch(`${apiBase}/users/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.email,
				verificationCode: data.code,
				password
			})
		});

		if (res.ok) {
			const { token, user: u } = await res.json();
			localStorage.setItem('token', token);

			u.canChangeMonikerAfter = new Date(u.canChangeMonikerAfter);
			u.loggedIn = true;
			$user = u;

			goto('/');
		} else {
			const { error } = await res.json();
			console.error(error);
		}
	}
</script>

<svelte:head>
	<title>Register ~ there's care.</title>

	<meta property="og:title" content="Register" />
	<meta property="og:description" content="Register for an account." />
</svelte:head>

<h1>Register</h1>
{#await getInfo()}
	<p>Loading, please wait...</p>
{:then data}
	<p>Alright, let's finish your registration!</p>
	<form on:submit={submit}>
		<div class="form-group">
			<label for="email">E-mail</label>
			<input type="text" id="email" class="input-block" value={data.email} disabled />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" id="password" class="input-block" bind:value={password} />
		</div>
		<p>
			When you click the "Finish registration" button below, you'll be bound by the privacy and user
			policies. This is some legal mumbo jumbo that we have to put in so we don't get sued. It's not
			that scary, promise!
		</p>
		<input class="paper-btn" type="submit" value="Finish registration" />
	</form>
{:catch err}
	{#if err.message === 'No code'}
		<p>
			To finish the registration process, you need to click the link in the e-mail you've received.
			If you haven't registered yet, click the register link in the navigation bar!
		</p>
	{:else if err.message === 'Bad code'}
		<p>
			Hmm, it appears your code is bad... Usually, this just means it's expired. Can you register
			again?
		</p>
	{:else}
		<p>
			{err.message}
		</p>
	{/if}
{/await}
