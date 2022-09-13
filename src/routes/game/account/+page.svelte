<script lang="ts">
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabase";

    const logout = async () => {
        const signoutRes = await supabase.auth.signOut();
        if (signoutRes.error) {
            console.error("something went wrong when signing out");
        }
        goto("/auth/signin");
    };
</script>

<div class="container">
    <button class="blue-button" on:click={logout}>Logout</button>
</div>

<style>
    .container {
        margin: 1rem;
    }
</style>
