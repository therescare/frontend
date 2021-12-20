<script lang="ts">
	import lewis from './lewis.png';
	import friz from './friz.png';
	import maige from './maige.png';
	import angie from './angie.png';
	import moo from './moo.png';
	import boop from './boop.png';

	const contributors = [
		{
			name: 'Lewis',
			image: lewis,
			title: 'Head Developer & Founder',
			text: 'I organised this. Hi!'
		},
		{
			name: 'Friz',
			image: friz,
			title: 'Finance and Strategy Man',
			text: 'I buy all of the domains and infrastructure!'
		},
		{
			name: 'Maige',
			image: maige,
			title: 'Wiki Writer',
			text: "I'm Maige, I'm a girl who has experience with schizophrenia and depression, if you ever want someone to talk to I am always available !! <3"
		},
		{
			name: 'Angie',
			image: angie,
			title: 'Wiki Writer',
			text: "I'm Angie, I'm Autistic and I'm out here to help and represent the kind people we can be! Feel free to chat <3"
		},
		{
			name: 'Moo',
			image: moo,
			title: 'Wiki Writer',
			text: "Hey I'm Moo! I enjoy bringing communities together as a whole regardless of their differences, feel free to reach out!"
		},
		{
			name: 'boop',
			image: boop,
			title: 'Wiki Writer',
			text: "Hey, im boops, bit clumsy and I struggle with anxiety and tourettes. I'm here to help as we move along. Reach out if needed!"
		}
	];
</script>

<svelte:head>
	<title>About ~ there's care.</title>

	<meta property="og:title" content="About" />
	<meta property="og:description" content="Here's the people who built the site and what we use." />
</svelte:head>

<h1>About</h1>
<p>
	there's care is a site that started to help promote wellbeing and care between friends, family,
	and everyone! We've dedicated time and energy to making a useful resource for people to help care
	for themselves and help care for others.
</p>
<h2>Team</h2>
<p>These are the people who make there's care tick.</p>
<div>
	<div class="row">
		{#each contributors as contributor}
			<div class="xs-4 col">
				<div class="card">
					<img src={contributor.image} alt="lewis" />
					<div class="card-body">
						<h4 class="card-title">{contributor.name}</h4>
						<h5 class="card-subtitle">{contributor.title}</h5>
						<p class="card-text">{contributor.text}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
<h2>Acknowledgements</h2>
<p>Here's some of the stuff we've used.</p>
<div class="card">
	<div class="card-body">
		<p class="card-text margin-none">
			Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
			<a href="https://www.flaticon.com/" title="Flaticon" class="margin-none">www.flaticon.com</a>
		</p>
	</div>
</div>
