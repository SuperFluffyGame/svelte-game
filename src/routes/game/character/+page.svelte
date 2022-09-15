<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";

    let username = "Loading...";

    onMount(async () => {
        const usernameRes = await supabase
            .from("users")
            .select("username")
            .single();
        if (usernameRes.error || !usernameRes.data) {
            username = "Character not Created.";
        } else {
            username = usernameRes.data.username;
        }
    });
</script>

<div class="container">
    <div class="left">
        <h2 class="name">{username}</h2>
        <hr class="name-divider" />
    </div>
    <div class="right">
        <div class="bar" />
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .name {
        margin: 1rem;
        margin-bottom: 0;
    }
    .name-divider {
        margin-bottom: 1rem;
        margin-inline: 1rem;
    }

    .container {
        flex: 1;
        display: flex;
        align-items: stretch;
        min-height: 30rem;
    }

    .left {
        margin: 1rem;
        border-radius: 1rem;
        background-color: var(--bl5);
        width: 20rem;
    }

    .right {
        display: flex;
    }

    .bar {
        background-color: var(--bl5);
        flex-grow: 1;
        width: 0.1rem;
    }
</style>
