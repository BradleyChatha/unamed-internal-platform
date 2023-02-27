<script lang="ts">
	import type { FrontendApiCreateBrowserVerificationFlowRequest } from '@ory/kratos-client';
	import KratosFormRenderer, { type KratosFlow } from '$lib/components/KratosFormRenderer.svelte';
	import { t } from '$lib/plugins/i18n';

	const flow = {
		action: 'Verification',
		payload: {} as FrontendApiCreateBrowserVerificationFlowRequest
	} satisfies KratosFlow;
</script>

<KratosFormRenderer {flow} />
