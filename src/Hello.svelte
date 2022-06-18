<script lang="ts">
    import type { ProfileType } from './util';
    
    export let profile : ProfileType;

</script>

{#if profile && profile.webId}
    <h1>Hello {profile.givenName ? profile.givenName : "Anonymous 😉"} !</h1>
{/if}