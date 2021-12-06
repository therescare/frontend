<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
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
				<li><a href="https://buymeacoffee.com/therescare">Donate</a></li>
				<li><a href="/team">Team</a></li>
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
