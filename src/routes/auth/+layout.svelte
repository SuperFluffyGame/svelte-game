<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";

    import "../../app.css";

    onMount(async () => {
        const userRes = await supabase.auth.getUser();

        if (!userRes.error) {
            goto("/game");
        }
    });
</script>

<div class="container" id="particles">
    <script src="particles.js" defer></script>
    <slot />
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
