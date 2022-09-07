<script lang="ts">
    import Item from "$lib/Item.svelte";
    import { onMount } from "svelte";

    let name = "Loading...";
    onMount(() => {
        name = localStorage.getItem("USERNAME") ?? "Something went wrong";
    });
</script>

<div class="container">
    <Item
        name="16 character max"
        power={10}
        count={2_500_000}
        rating={4}
        cost={1}
        icon=""
    />
    <Item name="Wood" power={1} count={1} rating={0} cost={1} icon="" />
</div>

<style>
</style>
