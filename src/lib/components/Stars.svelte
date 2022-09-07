<script lang="ts">
    import emptyStar from "$lib/assets/empty-star.svg";
    import fullStar from "$lib/assets/full-star.svg";

    export let n: number;
</script>

{#each Array(5) as _, i}
    {#if i < n}
        <img src={fullStar} alt="star" class="star" />
    {:else}
        <img src={emptyStar} alt="star" class="star" />
    {/if}
{/each}

<style>
    .star {
        width: 1rem;
        height: 1rem;
    }
</style>
