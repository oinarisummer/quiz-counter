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
		<p>正答数と誤答数をカウントするシンプルなルールです。</p>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = Rule.simple)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.mn)}</span>
		<p>正解でmポイント、誤答でnポイント点数が変動します。</p>
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
		<p>
			0ポイントmバツからスタートします。<br>
			正解で+1マル、誤答で-1バツとなり、
			マル×バツ = n × m以上になると勝ち。
		</p>
		<div class="flex items-center gap-3 m-3">
			<p>n</p>
			<input type="number" min="1" style="width:4rem" bind:value={$nByMParameters.n} />
			<p>m</p>
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
		<p>正解で+1ポイント、誤答でポイントが0になります。</p>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = Rule.updown)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.swedish)}</span>
		<p>スウェーデンリレーの様に、正解数が増えると誤答時のバツが増えます。</p>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = Rule.swedish)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(Rule.divide)}</span>
		<p>
			初期ポイントからスタートします。<br>
			正解で+初期ポイント、
			n回目の誤答でポイントが1/nになります。
		</p>
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
		<p>
			n回目の誤答でポイントが(誤答時倍率) x n変動します。
		</p>
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
