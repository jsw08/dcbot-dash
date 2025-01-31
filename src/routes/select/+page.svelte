<script lang=ts>
    import type {PageProps} from "./$types"

    let {data}: PageProps = $props();
</script>

<div class="w-full h-full grid grid-cols-[repeat(auto-fit,300px)]">
    {#each data.images as sexy}
        <div class="border w-fit h-fit">
            <h3 class="text-center">{sexy.name}</h3>
            <img src={sexy.thumbnail ? `/sexy/${sexy.name}/${sexy?.thumbnail}` : "/empty.png"} alt="">
            <a class="p-2 border" href="/manage/{sexy.name}">Edit</a>
            <button class="p-2 border">Delete</button>
        </div>
    {/each}
</div>