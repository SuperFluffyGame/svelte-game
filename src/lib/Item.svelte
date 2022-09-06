<script lang="ts">
    import { onMount } from "svelte";
    import type { Item } from "./data";

    export let name: string;
    export let count: number;
    export let rating: number;
    export let cost: number;
    export let power: number;
</script>

<div class="container">
    {name}
</div>
