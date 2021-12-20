<script lang="ts">
	import { user } from '../../stores';
	import { apiBase } from '../api';
	import FormModal from '../modals/FormModal.svelte';
	import Modal from '../modals/Modal.svelte';

	import light from './light.svg';

	//#region logins
	let loginEmail = '';
	let loginPassword = '';
	let loginError = '';

	async function login() {
		if (!loginEmail) {
			return (loginError = 'You need to enter an e-mail!');
		}

		if (!loginPassword) {
			return (loginError = 'You need to enter a password!');
		}

		loginError = '';

		const res = await fetch(`${apiBase}/users/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: loginEmail, password: loginPassword })
		});

		if (!res.ok) {
			const error = await res.json();
			return (loginError = error.error);
		}

		const { token, user: u } = await res.json();
		localStorage.setItem('token', token);

		u.canChangeMonikerAfter = new Date(u.canChangeMonikerAfter);
		u.loggedIn = true;
		$user = u;

		(document.getElementById('loginModal') as HTMLInputElement).checked = false;
	}
	//#endregion

	//#region registration
	let registerEmail = '';
	let registerError = '';
	let registerOk = false;

	async function register() {
		registerOk = false;

		if (!registerEmail) {
			return (registerError = 'You need to enter an e-mail!');
		}

		registerError = '';

		const res = await fetch(`${apiBase}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: registerEmail })
		});

		if (!res.ok) {
			const error = await res.json();
			return (registerError = error.error);
		}

		registerOk = true;
	}
	//#endregion

	function logout() {
		$user = {
			loggedIn: false,
			id: null,
			email: null,
			moniker: null,
			canChangeMonikerAfter: null
		};
		localStorage.removeItem('token');
	}
</script>

<nav class="paper split-nav margin padding-small">
	<div class="nav-brand">
		<a href="/"
			><img src={light} class="no-border" style="height: 40px" alt="there's care. logo" /></a
		>
	</div>
	<div class="collapsible">
		<input id="collapsible0" type="checkbox" name="collapsible0" />
		<label for="collapsible0" class="border-none" style="margin: 2px 1rem 2px 2px">
			<div class="bar1" />
			<div class="bar2" />
			<div class="bar3" />
		</label>
		<div class="collapsible-body">
			<ul class="inline">
				{#if $user.loggedIn}
					<li>Hey there, {$user.moniker}!</li>
					<li class="dont-show-if-collapsed">~</li>
					<li><a href="/" on:click={logout}>Log out</a></li>
				{:else}
					<li><label for="loginModal">Log in</label></li>
					<li><label for="registerModal">Register</label></li>
				{/if}
				<li class="dont-show-if-collapsed">~</li>
				<li><a href="/wiki">Wiki</a></li>
				<li class="dont-show-if-collapsed">~</li>
				We're here for you &lt;3
			</ul>
		</div>
	</div>
</nav>

<FormModal
	id="loginModal"
	title="Log in"
	description="Log in to your there's care account."
	submitFunction={login}
>
	<div class="form-group">
		<label for="email">E-mail</label>
		<input type="text" id="email" class="input-block" bind:value={loginEmail} />
	</div>
	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" id="password" class="input-block" bind:value={loginPassword} />
	</div>
	<p class="text-danger">{loginError}</p>
	<input class="paper-btn" type="submit" value="Log in" />
</FormModal>

<FormModal
	id="registerModal"
	title="Register"
	description="Register for an account on there's care."
	submitFunction={register}
>
	<div class="form-group">
		<label for="email">E-mail</label>
		<input type="text" id="email" class="input-block" bind:value={registerEmail} />
	</div>
	<p>When you click register, you will be sent a verification e-mail with a link to proceed.</p>
	<p class="text-danger">{registerError}</p>
	{#if registerOk}
		<p class="text-success">An e-mail has been sent if an account doesn't already exist!</p>
	{/if}
	<input class="paper-btn" type="submit" value="Register" />
</FormModal>

<style>
	nav {
		width: initial;
		position: sticky;
	}

	nav .bar1,
	nav .bar2,
	nav .bar3 {
		height: 0.2rem;
	}

	/* basically a ton of resets */
	ul > li > label {
		display: inline;
		color: #41403e;
		color: var(--primary);
		border-bottom-color: #41403e;
		border-bottom-color: var(--primary);
		background-image: none;
		border-bottom-left-radius: 15px 3px;
		border-bottom-right-radius: 15px 5px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-style: solid;
		border-bottom-width: 5px;
		padding-bottom: 0.1rem;
		font-size: 1.3rem;
		font-weight: inherit;
		margin: inherit;
		padding: inherit;
		border-top: none;
		border-left: none;
		border-right: none;
		padding-bottom: 0.1rem;
	}

	ul > li > label:hover {
		border-color: #41403e;
		border-bottom: 5px solid;
		border-color: var(--primary-light);
	}

	@media only screen and (max-width: 768px) {
		.collapsible .dont-show-if-collapsed {
			display: none !important;
		}
	}
</style>
