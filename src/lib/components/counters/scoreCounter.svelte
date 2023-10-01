<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import {
		CheckCircleSolid,
		CloseCircleSolid
	} from 'flowbite-svelte-icons';

	export const id: string = crypto.randomUUID();

	export let whenCorrect = 1;

	export let whenIncorrect = -1;

	export let correct: number = 0;

	export let incorrect: number = 0;

	export let score: number = 0;

	// let undoStack: Array<{ correct: number; worng: number; score: number }> = [];

	// const dispatch = createEventDispatcher();

	const onCorrect = () => {
		// pushUndoStack();
		correct++;
		score = score + whenCorrect;
	};

	const onWorng = () => {
		// pushUndoStack();
		incorrect++;
		score = score + whenIncorrect;
	};

	// const undo = () => {
	// 	const pop = undoStack.pop();
	// 	if (pop) {
	// 		correct = pop.correct;
	// 		incorrect = pop.worng;
	// 		score = pop.score;
	// 	}
	// };

	// const reset = () => {
	// 	score = 0;
	// 	correct = 0;
	// 	incorrect = 0;
	// 	undoStack = [];
	// };

	// function pushUndoStack() {
	// 	undoStack.push({ correct: correct, worng: incorrect, score: score });
	// }

	// function deleteClick() {
	// 	dispatch('delete');
	// }
</script>

<span class="flex justify-center"><p class="text-6xl text-black dark:text-white">{score}</p></span>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{correct}</p>
	<Button color="red" on:click={onCorrect}><CheckCircleSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{incorrect}</p>
	<Button color="blue" on:click={onWorng}><CloseCircleSolid /></Button>
</div>
