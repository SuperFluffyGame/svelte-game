<script lang="ts">
    import Item from "$lib/components/Item.svelte";
    import LargeItem from "$lib/components/LargeItem.svelte";
    import { onMount } from "svelte";
    import { each } from "svelte/internal";

    let name = "Loading...";
    onMount(() => {
        name = localStorage.getItem("USERNAME") ?? "Something went wrong";
    });
</script>

<div class="container">
    <div class="equipped">
        {#each Array(8) as _, i}
            <LargeItem
                name="Wood"
                power={2}
                count={2_500_000}
                rating={4}
                cost={1}
                icon=""
            />
        {/each}
    </div>
    <div class="divider" />
    <div class="categories">
        <div class="category">
            <h2 class="category-title">Weapons/Tools</h2>
        </div>
        <div class="divider" />

        <div class="category">
            <h2 class="category-title">Armor</h2>
        </div>
        <div class="divider" />

        <div class="category">
            <h2 class="category-title">Crafting</h2>
        </div>
        <div class="divider" />

        <div class="category">
            <h2 class="category-title">Upgrading</h2>
        </div>
    </div>
</div>

<style>
    .categories {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }
    .category {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        /* justify-content: center; */
    }
    .category-title {
        text-align: center;
        margin-top: 1rem;
    }

    h2 {
        margin: 0;
    }
    .container {
        flex-grow: 1;
        display: flex;
    }
    .equipped {
        padding: 1rem;
        width: fit-content;
        height: fit-content;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
    }
    .divider {
        width: 0.1rem;
        background-color: var(--bl5);
    }

    @media screen and (max-width: 1000px) {
        .categories {
            flex-direction: column;
        }
        .category {
            min-height: 15rem;
        }
        .category-title {
            text-align: left;
        }
        .divider {
            height: 0.1rem;
            width: auto;
            background-color: var(--bl5);
        }
    }
</style>
