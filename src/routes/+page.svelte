<script lang="ts">
	import CounterFrame from '$lib/components/counters/counterFrame.svelte';
	import RuleSetting from '$lib/components/ruleSetting.svelte';
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { RuleType } from '$lib/definitions/rules';
	import { inicialPoint, nByMParameters, rule } from '$lib/store/store';
	import { Button, Modal } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, GearSolid, PlusSolid, UndoOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

  let counters: CounterParameters[] = new Array();

	onMount(() => {
		addCard()
		undoStack = []
	})

	const inicialCard = (id: number): CounterParameters => {
		switch ($rule) {
			case RuleType.by:
				return { id:id, score: 0, correct: 0, incorrect: $nByMParameters.m }
			case RuleType.divide:
				return { id:id, score: $inicialPoint, correct: 0, incorrect: 0 }
			default:
				return { id:id, score: 0, correct: 0, incorrect: 0 }
		}
	}

	const addCard = () => {
		counters = [...counters, inicialCard(counters.length + 1)]
	}

	const deleteCard = (event: CustomEvent) => {
		counters = counters.filter((counter) => counter.id != event.detail)
	}

	let undoStack: CounterParameters[] = new Array()

	const pushUndoStack = (event: CustomEvent) => {
		const changedCounter = counters.find((counters) => counters.id === event.detail)
		if (changedCounter) {
			undoStack = [...undoStack, structuredClone(changedCounter)]	
		}
	}

	const undo = () => {
		const pop = undoStack.pop()
		if (pop) {
			counters = counters.map((counter) => {
				if (counter.id === pop.id) {
					return pop
				}
				return counter
			})
		}
	}

	$: hasUndoStack = undoStack.length > 0;

	const allReset = () => {
		counters = counters.map((counter) => inicialCard(counter.id))
		undoStack = []
	}

	let popupModal = false
</script>

<div class="container mx-auto">
	<div class="flex justify-end align-middle gap-3 m-3">
		<Button type="button" outline={true} color="dark" on:click={undo} disabled={!hasUndoStack} >
			<UndoOutline />
		</Button>
		<Button type="button" outline={true} color="dark" on:click={allReset} >
			<ArrowsRepeatSolid />
		</Button>
		<button type="button" on:click={() => (popupModal = true)}><GearSolid /></button>
	</div>

	<div class="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each counters as counter, index}
			<CounterFrame bind:counterParameter={counter} order={index} on:changed={pushUndoStack} on:delete={deleteCard} />
		{/each}
		<Button color="dark" outline={true} on:click={addCard}><PlusSolid /></Button>
	</div>
</div>

<Modal bind:open={popupModal} size="md" outsideclose><RuleSetting /></Modal>
