<script lang="ts">
	import type { FrontendApiCreateBrowserLoginFlowRequest } from '@ory/kratos-client';
	import KratosFormRenderer, { type KratosFlow } from '$lib/components/KratosFormRenderer.svelte';
	import { t } from '$lib/plugins/i18n';

	const flow = {
		action: 'Login',
		payload: {} as FrontendApiCreateBrowserLoginFlowRequest
	} as KratosFlow;
</script>

<KratosFormRenderer {flow} />
