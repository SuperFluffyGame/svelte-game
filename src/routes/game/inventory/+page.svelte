<script lang="ts">
    import Item from "$lib/Item.svelte";
    import { onMount } from "svelte";

    let name = "Loading...";
    onMount(() => {
        name = localStorage.getItem("USERNAME") ?? "Something went wrong";
    });
</script>

<div class="container">
    <Item name="Wood" power={1} count={1} rating={4} cost={1} />
</div>

<style>
</style>
