<script lang="ts">
    type SystemMessage = { type: 'system', text: string };
    type PrivateFromMessage = { type: 'privateFrom', from: string; text: string };
    type PrivateToMessage = { type: 'privateTo', to: string; text: string };
    type UserMessage = { type: 'user', author: string; text: string };

    type Message = SystemMessage | PrivateFromMessage | PrivateToMessage | UserMessage;

	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	export let messages: Message[];
	export let sendMessage: (message: string) => void;

	let text = '';
	let messageContainer: HTMLDivElement;

	onMount(() => {
		messageContainer.scrollTop = messageContainer.scrollHeight;
	});

	beforeUpdate(() => {
		if (messages.length > 500) {
			messages.splice(0, messages.length - 500);
		}
	});

	afterUpdate(() => {
		// scroll to bottom if the user is within 25 pixels of the bottom
		if (
			Math.abs(
				messageContainer.scrollHeight - messageContainer.scrollTop - messageContainer.clientHeight
			) < 25
		) {
			messageContainer.scrollTop = messageContainer.scrollHeight;
		}
	});

	function message(e: Event) {
		sendMessage(text);
		text = '';

		e.preventDefault();
	}
</script>

<div class="chat">
	<div class="border padding margin-bottom">
		<div id="messages" bind:this={messageContainer}>
			{#each messages as message}
				{#if message.type === 'system'}
					<div>🖥️ <i>{message.text}</i></div>
                {:else if message.type === 'privateFrom'}
                    <div><i>From <b>{message.from}</b>:</i> {message.text}</div>
                {:else if message.type === 'privateTo'}
                    <div><i>To <b>{message.to}</b>:</i> {message.text}</div>
				{:else if message.type === 'user'}
					<div><b>{message.author}:</b> {message.text}</div>
				{/if}
			{/each}
		</div>
	</div>
	<form on:submit={message}>
		<div class="form-group">
			<input class="input-block" type="text" id="chatMessage" bind:value={text} />
		</div>
		<div class="form-group">
			<input class="paper-btn" type="submit" value="Send" />
		</div>
	</form>
</div>

<style>
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: var(--primary);
		border-bottom-left-radius: 185px 25px;
		border-bottom-right-radius: 20px 205px;
		border-top-left-radius: 125px 25px;
		border-top-right-radius: 10px 205px;
	}

	#messages {
		display: flex;
		flex-direction: column;
		height: 500px;
		overflow-y: scroll;
	}
</style>
