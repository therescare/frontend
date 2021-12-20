<script lang="ts">
	import '../app.css';

	import { browser, dev } from '$app/env';

	import Header from '$lib/header/Header.svelte';
	import { user } from '../stores';

	if (browser && !$user.loggedIn && localStorage.getItem('token')) {
		const apiBase = dev ? 'http://localhost:1339' : 'https://api.theres.care';
		fetch(`${apiBase}/users/me`, {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		})
			.then((res) => {
				if (!res.ok) return Promise.reject('failed');
				return res.json();
			})
			.then((data) => {
				data.canChangeMonikerAfter = new Date(data.canChangeMonikerAfter);
				data.loggedIn = true;
				$user = data;
			})
			.catch(); // nom nom nom
	}
</script>

<Header />

<main>
	<div class="container paper">
		<slot />
	</div>
</main>

<footer class="footer paper">
	<div class="row margin-none">
		<div class="col-fill col padding-none"><p>Because people do care in the world.</p></div>
		<div class="col-fill col padding-none" style="text-align: right">
			<ul class="inline footer-links">
				<li><a href="https://discord.gg/therescare">Discord</a></li>
				<li><a href="https://buymeacoffee.com/therescare">Donate</a></li>
				<li><a href="/privacy">Privacy</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	main {
		flex: 1 0 auto;
	}

	footer {
		flex-shrink: 0;
		margin-bottom: 0;
		padding: 0 2rem;
	}

	.footer-links > li::before {
		content: none;
	}
</style>
