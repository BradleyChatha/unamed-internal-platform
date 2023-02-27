<script context="module" lang="ts">
	import type {
		FrontendApiCreateBrowserLoginFlowRequest,
		FrontendApiCreateBrowserLogoutFlowRequest,
		FrontendApiCreateBrowserRecoveryFlowRequest,
		FrontendApiCreateBrowserRegistrationFlowRequest,
		FrontendApiCreateBrowserSettingsFlowRequest,
		FrontendApiCreateBrowserVerificationFlowRequest,
		UiNodeInputAttributes,
		UiNode,
		UiNodeScriptAttributes,
		UiNodeImageAttributes,
		UiNodeTextAttributes
	} from '@ory/kratos-client';

	export type KratosFlow =
		| {
				action: 'Login';
				payload: FrontendApiCreateBrowserLoginFlowRequest;
		  }
		| {
				action: 'Recovery';
				payload: FrontendApiCreateBrowserRecoveryFlowRequest;
		  }
		| {
				action: 'Registration';
				payload: FrontendApiCreateBrowserRegistrationFlowRequest;
		  }
		| {
				action: 'Settings';
				payload: FrontendApiCreateBrowserSettingsFlowRequest;
		  }
		| {
				action: 'Verification';
				payload: FrontendApiCreateBrowserVerificationFlowRequest;
		  };
</script>

<script lang="ts">
	import { t } from '../plugins/i18n';
	import { FrontendApi } from '@ory/kratos-client';
	import { KRATOS_URL } from '$lib/constants';
	import { page } from '$app/stores';

	export let flow: KratosFlow;

	const api = new FrontendApi(undefined, KRATOS_URL);
	const flowId = $page.url.searchParams.get('flow');
	const flowPromise = flowId
		? api[`get${flow.action}Flow`]({
				id: flowId!,
				cookie: document.cookie
		  })
		: api[`createBrowser${flow.action}Flow`]();

	function asInputNode(node: UiNode): UiNodeInputAttributes {
		return node.attributes as UiNodeInputAttributes;
	}

	function asScriptNode(node: UiNode): UiNodeScriptAttributes {
		return node.attributes as UiNodeScriptAttributes;
	}

	function asImageNode(node: UiNode): UiNodeImageAttributes {
		return node.attributes as UiNodeImageAttributes;
	}

	function asTextNode(node: UiNode): UiNodeTextAttributes {
		return node.attributes as UiNodeTextAttributes;
	}

	function performKratosOnClick(node: UiNode) {
		return () => {
			const inputNode = asInputNode(node);
			if (inputNode.onclick) {
				eval(inputNode.onclick as string);
			}

			return null;
		};
	}
</script>

{#await flowPromise}
	<div>{t('general-loading')}</div>
{:then kratosFlow}
	<form action={kratosFlow.data.ui.action} method={kratosFlow.data.ui.method}>
		{#each kratosFlow.data.ui.nodes as node, index}
			{#if index > 0 && kratosFlow.data.ui.nodes[index - 1].group != node.group}
				<h2>{t(`kratos-settings-title-${node.group}`)}</h2>
			{/if}

			{#if node.type === 'input'}
				<div>
					{#if asInputNode(node).type === 'submit' || node.meta.label?.id === 1050012}
						<button
							type="submit"
							disabled={asInputNode(node).disabled}
							name={asInputNode(node).name}
							value={asInputNode(node).value ?? ''}
							on:click={performKratosOnClick(node)}
						>
							{node.meta.label?.text}
						</button>
					{:else}
						{#if node.meta.label?.text}
							<label for={asInputNode(node).name}>{node.meta.label?.text}</label>
						{/if}
						<input
							autocomplete={asInputNode(node).autocomplete ? 'on' : 'off'}
							disabled={asInputNode(node).disabled}
							name={asInputNode(node).name}
							type={asInputNode(node).type}
							value={asInputNode(node).value ?? ''}
							required={asInputNode(node).required && flow.action !== 'Settings'}
							pattern={asInputNode(node).pattern}
						/>
					{/if}
					{#each node.messages as message}
						<div>
							{message.type} - {t('kratos-error-by-id', {
								id: message.id,
								default: message.text,
								...message.context
							})}
						</div>
					{/each}
				</div>
			{:else if node.type === 'script'}
				<script
					src={asScriptNode(node).src}
					async={asScriptNode(node).async}
					referrerpolicy="no-referrer"
					crossorigin={asScriptNode(node).crossorigin}
					integrity={asScriptNode(node).integrity}
					type="text/javascript"
					id={asScriptNode(node).id}
					nonce={asScriptNode(node).nonce}
				></script>
			{:else if node.type === 'img'}
				<img
					src={asImageNode(node).src}
					id={asImageNode(node).id}
					width={asImageNode(node).width}
					height={asImageNode(node).height}
					alt={node.meta.label?.text}
				/>
			{:else if node.type === 'text'}
				<p>
					{asTextNode(node).text.text}
				</p>
			{:else}
				<p>Unhandled node:</p>
				<pre>{JSON.stringify(node, null, 2)}</pre>
			{/if}
		{/each}
		{#each kratosFlow.data.ui.messages ?? [] as message}
			<div>
				{message.type} - {t('kratos-error-by-id', {
					id: message.id,
					default: message.text,
					...message.context
				})}
			</div>
		{/each}
	</form>
	<pre>{JSON.stringify(kratosFlow, null, 2)}</pre>
{:catch error}
	<div>{t('general-error')}: {error}</div>
{/await}

<style lang="scss">
</style>
