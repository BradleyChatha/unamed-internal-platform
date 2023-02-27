<script lang="ts">
	import type { FrontendApiCreateBrowserSettingsFlowRequest } from '@ory/kratos-client';
	import KratosFormRenderer, { type KratosFlow } from '$lib/components/KratosFormRenderer.svelte';
	import { t } from '$lib/plugins/i18n';

	const flow = {
		action: 'Settings',
		payload: {} as FrontendApiCreateBrowserSettingsFlowRequest
	} as KratosFlow;
</script>

<KratosFormRenderer {flow} />
