<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<svelte:head>
	<title>Everything okay? ~ there's care.</title>

	<meta property="og:title" content="Everything okay?" />
	<meta
		property="og:description"
		content="It's okay to not be okay. Your feelings are valid, no matter what they are or what anyone else says."
	/>
</svelte:head>

<p>
	Hey, everything alright? It's okay to <u>not</u> be okay. Your feelings are valid, no matter what they
	are or what anyone else says.
</p>
<p>
	It's hard to go through anything, including stress, anxiety, or depression. There's times where it
	really gets rough. You're here probably searching for an answer or a magic bullet to get rid of
	your feelings, but there is no such thing. Nevertheless, we have plenty of things that can ease
	your way through it all.
</p>
<!--<p>
	If you need to chat, you can take part in the <a href="#">safe and anonymous chatrooms</a> that we
	provide. Feel free to talk about your problems here. There's no judgement here. Alternatively, we
	have a <a href="#">Discord server</a> that's heavily moderated if you want to talk and make friends.
</p>-->
<p>
	If you'd rather not chat and would rather look up information on your own to help yourself, you
	can
	<a href="/wiki">read our wiki of various conditions</a> and see what matches you the most. This
	wiki is written by our community and contains information to help ease your way through what
	you're going through. Despite this, we do <b>not provide medical advice</b> and the wiki cannot substitute
	professional help. We try to provide the best possible resources to help you through, but we can't
	be a replacement for actual medical help.
</p>
<p>
	If you need urgent help, we strongly advise going to your country's support services. If you're in
	the United States, the
	<a href="https://www.nami.org/help">National Alliance on Mental Illness helpline</a> can help you.
	If you're in Europe,
	<a href="https://mhe-sme.org/library/youth-helplines/">Mental Health Europe</a> has helplines for
	almost every country. Finally,
	<a
		href="https://tumblr.zendesk.com/hc/en-us/articles/231885028-Counseling-and-prevention-resources"
		>Tumblr</a
	>
	has thrown together loads of counseling and prevention services and helplines.
</p>
<p>
	And remember, people love you, no matter who you are. There's care, because people do care in the
	world.
</p>
