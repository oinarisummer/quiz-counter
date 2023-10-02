<script lang="ts">
	import { Rule, ruleName } from '$lib/definitions/rules';
	import { inicialPoint, nByMParameters, rule, whenCorrect, whenIncorrect } from '$lib/store/store';
	import { Accordion, AccordionItem, Button } from 'flowbite-svelte';

	// for divide by n
	let divideInicialPoint = 10;

	let othersWhenCorect = 1;
</script>

<Accordion class="my-5">
	<AccordionItem>
		<span slot="header">{ruleName(Rule.simple)}</span>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = Rule.simple)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.mn)}</span>
		<div class="flex items-center gap-3 m-3">
			<p>正解ポイント</p>
			<input type="number" style="width:4rem" bind:value={othersWhenCorect} />
			<p>誤答ポイント</p>
			<input type="number" style="width:4rem" bind:value={$whenIncorrect} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {
					$rule = Rule.mn;
					$whenCorrect = othersWhenCorect;
				}}>submit</Button
			>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.by)}</span>
		<div class="flex items-center gap-3 m-3">
			<p>N</p>
			<input type="number" min="1" style="width:4rem" bind:value={$nByMParameters.n} />
			<p>M</p>
			<input type="number" min="1" style="width:4rem" bind:value={$nByMParameters.m} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {$rule = Rule.by}}>submit</Button
			>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.updown)}</span>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = Rule.updown)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.swedish)}</span>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = Rule.swedish)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.divide)}</span>
		<div class="flex items-center gap-3 m-3">
			<p>初期ポイント</p>
			<input type="number" min="1" style="width:4rem" bind:value={divideInicialPoint} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {
					$rule = Rule.divide;
					$inicialPoint = divideInicialPoint;
				}}>submit</Button
			>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.backstream)}</span>
		<div class="flex items-center gap-3 m-3">
			<p>誤答時倍率</p>
			<input type="number" max="-1" style="width:4rem" bind:value={$whenIncorrect} />
		</div>
		<div class="flex justify-end">
			<Button 
				on:click={() => {
					$rule = Rule.backstream;
					$whenCorrect = 1;
				}}>submit</Button>
		</div>
	</AccordionItem>
</Accordion>
