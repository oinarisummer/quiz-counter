<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import {
		CheckCircleSolid,
		CloseCircleSolid
	} from 'flowbite-svelte-icons';
	// import { createEventDispatcher } from 'svelte';

	export let correct = 0;

	export let incorrect = 0;

	// let undoStack: Array<{ correct: number; worng: number }> = [];

	// const dispatch = createEventDispatcher();

	// function deleteClick() {
	// 	dispatch('delete');
	// }

	const onCorrect = () => {
		// pushUndoStack();
		correct++;
	};

	const onWorng = () => {
		// pushUndoStack();
		incorrect++;
	};

	// const undo = () => {
	// 	const pop = undoStack.pop();
	// 	if (pop) {
	// 		correct = pop.correct;
	// 		incorrect = pop.worng;
	// 	}
	// };

	// export const reset = () => {
	// 	correct = 0;
	// 	incorrect = 0;
	// 	undoStack = [];
	// };

	// function pushUndoStack() {
	// 	undoStack.push({ correct: correct, worng: incorrect });
	// }
</script>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{correct}</p>
	<Button color="red" on:click={onCorrect}><CheckCircleSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{incorrect}</p>
	<Button color="blue" on:click={onWorng}><CloseCircleSolid /></Button>
</div>
