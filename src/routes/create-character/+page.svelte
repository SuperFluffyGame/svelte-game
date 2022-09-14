<script lang="ts">
    import "../../app.css";
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";

    onMount(async () => {
        const userRes = await supabase.auth.getUser();
        if (userRes.error) {
            goto("/auth/signin");
            return;
        }
    });

    const _submit = () => {};
</script>

<div class="container">
    <h1 class="title">Character Creation</h1>
    <form on:submit|preventDefault={_submit}>
        <input
            type="text"
            name="username"
            id="username"
            class="text-input"
            placeholder="Username"
        />
        <button type="submit" class="create-button blue-button">Create</button>
    </form>
</div>

<style>
    .container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    form {
        display: flex;
        flex-direction: column;
    }
</style>
