<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<input class="modal-state" {id} type="checkbox" />

<div class="modal">
	<label class="modal-bg" for={id} />
	<div class="modal-body">
		<label class="btn-close" for={id}>X</label>
		<h4 class="modal-title">{title}</h4>
		<slot />
	</div>
</div>
