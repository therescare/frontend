<script lang="ts">
	import light from './light.svg';
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
				<li><a href="/wiki">Wiki</a></li>
				<li class="dont-show-if-collapsed">~</li>
				We're here for you &lt;3
			</ul>
		</div>
	</div>
</nav>

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

	@media only screen and (max-width: 768px) {
		.collapsible .dont-show-if-collapsed {
			display: none !important;
		}
	}
</style>
