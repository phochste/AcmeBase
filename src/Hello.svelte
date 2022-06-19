<script lang="ts">
    import type { ProfileType } from './util';
    import { isLoggedIn } from './util';
    import { fetch } from '@inrupt/solid-client-authn-browser';
    import { getPodUrlAll } from "@inrupt/solid-client";
    import { login_store } from './login_store';

    export let profile : ProfileType;

    let resource : string;

    login_store.subscribe( val => {
        resource = val['url'];
    });
</script>

{#if isLoggedIn() && profile }
    <h1>Hello {profile.givenName ? profile.givenName : "Anonymous 😉"} !</h1>
    <i>{resource}</i>
    <h3>Overview of your pods:</h3>
    
    <!-- An example how to use the Inrupt solid-client -->
    {#await getPodUrlAll(profile.webId , {fetch: fetch})}
    <p>...waiting...</p>
    {:then urls}
        <ul>
        {#each urls as url}
            <li><p>{url}</p></li>
        {/each}
        </ul>
    {/await}
{/if}