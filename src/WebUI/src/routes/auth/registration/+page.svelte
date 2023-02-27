<script lang="ts">
	import type { FrontendApiCreateBrowserRegistrationFlowRequest } from '@ory/kratos-client';
	import KratosFormRenderer, { type KratosFlow } from '$lib/components/KratosFormRenderer.svelte';
	import { t } from '$lib/plugins/i18n';

	const flow = {
		action: 'Registration',
		payload: {} as FrontendApiCreateBrowserRegistrationFlowRequest
	} as KratosFlow;
</script>

<KratosFormRenderer {flow} />
