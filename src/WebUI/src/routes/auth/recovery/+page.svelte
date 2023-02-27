<script lang="ts">
	import type { FrontendApiCreateBrowserRecoveryFlowRequest } from '@ory/kratos-client';
	import KratosFormRenderer, { type KratosFlow } from '$lib/components/KratosFormRenderer.svelte';
	import { t } from '$lib/plugins/i18n';

	const flow = {
		action: 'Recovery',
		payload: {} as FrontendApiCreateBrowserRecoveryFlowRequest
	} as KratosFlow;
</script>

<KratosFormRenderer {flow} />
