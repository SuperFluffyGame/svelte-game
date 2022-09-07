<script lang="ts">
    import { goto } from "$app/navigation";

    const logout = () => {
        localStorage.removeItem("USERID");
        localStorage.removeItem("USERNAME");
        goto("/");
    };
</script>

<div class="container">
    <button on:click={logout} class="blue-button">Logout</button>
</div>

<style>
    .container {
        margin: 1rem;
    }
</style>
