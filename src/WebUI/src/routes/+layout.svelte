<script lang="ts">
	import { maybeUipError } from '$lib/helpers';
	import { t } from '$lib/plugins/i18n';
	import { GrpcWebImpl, PermissionsClientImpl } from '$lib/protos/permissions';

	const c = new PermissionsClientImpl(new GrpcWebImpl('/api/permissions', {}));
</script>

<div>
	{t('test')}
	{#await maybeUipError(() => c.ListRoles({})) then permissions}
		{JSON.stringify(permissions.Response)}
		{permissions.Roles.map((role) => role.Name).join(', ')}
	{:catch error}
		{error}
	{/await}
</div>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

	* {
		font-family: 'Source Sans Pro', sans-serif;
	}
</style>
