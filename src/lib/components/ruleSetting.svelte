<script lang="ts">
	import { RuleType, ruleName } from '$lib/definitions/rules';
	import { inicialPoint, nByMParameters, rule, whenCorrect, whenIncorrect } from '$lib/store/store';
	import { Accordion, AccordionItem, Button } from 'flowbite-svelte';
</script>

<Accordion class="my-5">
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.simple)}</span>
		<p>正答数と誤答数をカウントするシンプルなルールです。</p>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = RuleType.simple)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.mn)}</span>
		<p>正解でmポイント、誤答でnポイント点数が変動します。</p>
		<div class="flex items-center gap-3 m-3">
			<p>正解ポイント</p>
			<input type="number" style="width:4rem" bind:value={$whenCorrect} />
			<p>誤答ポイント</p>
			<input type="number" style="width:4rem" bind:value={$whenIncorrect} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {
					$rule = RuleType.mn;
				}}
			>
				submit
			</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.by)}</span>
		<p>
			0ポイントmバツからスタートします。<br />
			正解で+1マル、誤答で-1バツとなり、マル×バツ = n × m以上になると勝ち。
		</p>
		<div class="flex items-center gap-3 m-3">
			<p>n</p>
			<input type="number" min="1" style="width:4rem" bind:value={$nByMParameters.n} />
			<p>m</p>
			<input type="number" min="1" style="width:4rem" bind:value={$nByMParameters.m} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {
					$rule = RuleType.by;
				}}
			>
				submit
			</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.updown)}</span>
		<p>正解で+1ポイント、誤答でポイントが0になります。</p>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = RuleType.updown)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.swedish)}</span>
		<p>スウェーデンリレーの様に、正解数が増えると誤答時のバツが増えます。</p>
		<div class="flex justify-end">
			<Button on:click={() => ($rule = RuleType.swedish)}>submit</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.divide)}</span>
		<p>
			初期ポイントからスタートします。<br />
			正解で+初期ポイント、n回目の誤答でポイントが1/nになります。
		</p>
		<div class="flex items-center gap-3 m-3">
			<p>初期ポイント</p>
			<input type="number" min="1" style="width:4rem" bind:value={ $inicialPoint} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {
					$rule = RuleType.divide;
				}}
			>
				submit
			</Button>
		</div>
	</AccordionItem>
	<AccordionItem>
		<span slot="header">{ruleName(RuleType.backstream)}</span>
		<p>n回目の誤答でポイントが(誤答時倍率) x n変動します。</p>
		<div class="flex items-center gap-3 m-3">
			<p>誤答時倍率</p>
			<input type="number" max="-1" style="width:4rem" bind:value={$whenIncorrect} />
		</div>
		<div class="flex justify-end">
			<Button
				on:click={() => {
					$rule = RuleType.backstream;
					$whenCorrect = 1;
				}}
			>
				submit
			</Button>
		</div>
	</AccordionItem>
</Accordion>
