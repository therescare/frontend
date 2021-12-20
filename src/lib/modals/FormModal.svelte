<script lang="ts">
	import Modal from './Modal.svelte';

	export let id: string;
	export let title: string;
	export let description: string = null;
	export let submitFunction: Function;

	function preventDefaultSubmit(e: Event) {
		e.preventDefault();
		submitFunction();
	}
</script>

<Modal {id} {title}>
	{#if description}
		<p class="modal-text">
			{description}
		</p>
	{/if}
	<form on:submit={preventDefaultSubmit}>
		<slot />
	</form>
</Modal>
