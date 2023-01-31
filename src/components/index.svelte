<script lang="ts" context="module">
  import type { ROMTypes } from "../types";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import Rom from "./rom.svelte";

  export const router = false;
</script>

<script lang="ts">
  export let devices: ROMTypes[];
  export let roms = [];
  let searchResults = [...devices];
  const search = new Fuse(devices, {
    keys: [
      "brand",
      "codename",
      {
        name: "name",
        weight: 2,
      },
    ],
  });
  let toSearch = "";
  let brand = "";
  $: count = 200;
  function updateSearch() {
    let r = search.search(toSearch);
    searchResults.length = 0;
    let t;
    if (toSearch == "") {
      t = [...devices];
    } else {
      t = [...r.map((x) => x.item)];
    }
    if (brand !== "") {
      t = t.filter((x) => x.brand?.toLowerCase() === brand.toLowerCase());
    }
    searchResults.push(...t);
  }
  onMount(() => {
    let searchParams = new URLSearchParams(window.location.search);
    toSearch = searchParams.get("search") || "";
    brand = searchParams.get("brand") || "";
    updateSearch();
  });
</script>

<div class="mx-auto">
  <div class="max-w-full w-[80rem] p-4 mx-auto">
    <div class="flex md:flex-row flex-col gap-2">
      <input
        class="input input-primary rounded-none input-lg w-full"
        id="search"
        placeholder="Search"
        bind:value={toSearch}
        on:input={() => {
          //Theres probably a better way to do this but idk how /shrug
          if (toSearch !== "") {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("search", toSearch);
            const newLoc = new URL(window.location.toString());
            newLoc.search = searchParams.toString();
            window.history.pushState({}, null, newLoc);
          } else {
            const newLoc = new URL(window.location.toString());
            newLoc.search = "";
            window.history.pushState({}, null, newLoc);
          }

          updateSearch();
        }}
      />
      <input
        class="input input-primary rounded-none input-lg"
        placeholder="Brand"
        bind:value={brand}
        on:input={() => {
          if (brand !== "") {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("brand", brand);
            const newLoc = new URL(window.location.toString());
            newLoc.search = searchParams.toString();
            window.history.pushState({}, null, newLoc);
          } else {
            const newLoc = new URL(window.location.toString());
            newLoc.search = "";
            window.history.pushState({}, null, newLoc);
          }

          updateSearch();
        }}
      />
    </div>

    <div
      class="py-4 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-1 justify-evenly"
    >
      {#if searchResults.length == 0}
        <div
          class="bg-base-300 text-center p-4 rounded-md border-4 border-accent prose prose-invert prose-slate"
        >
          <p>No results to display</p>
        </div>
      {:else}
        {#each count !== -1 ? [...searchResults].slice(0, count) : searchResults as rom, index (rom.codename)}
          <div id={rom.codename} class="bg-base-300 card">
            <div class="card-body p-3">
              <a
                class="link link-hover link-secondary"
                rel="noopener"
                href={`/device/${rom.codename}`}
              >
                <h3 class="card-title">{rom.name || "Unknown"}</h3></a
              >

              <p class="text-zinc-200 card-compact">
                Brand: {rom.brand || "Unknown"}
                <br />

                Codename: {rom.codename || "Unknown"}
              </p>
              {#if rom.roms.length !== 0}
                <p class="text-sm flex-grow">
                  roms: {#each rom.roms as rom}
                    <a href={`#${rom}`}>{rom}</a>,{" "}
                  {/each}
                </p>
              {/if}
              {#if rom.recoveries.length !== 0}
                <p class="text-sm flex-grow">
                  recoveries: {#each rom.recoveries as recovery}
                    {recovery}{" "}
                    <!-- <a href={`#${rom.id}`}>{recovery.id}</a>,{' '} -->
                  {/each}
                </p>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    </div>
    <div class="flex justify-center gap-2">
      {#if !(count > searchResults.length || count < 0)}
        <button
          class="btn btn-primary"
          on:click={() => {
            count += 20;
          }}>Show More</button
        >
        <button
          class="btn btn-primary"
          on:click={() => {
            count += -1 - count;
          }}>Show All</button
        >
      {/if}
    </div>
  </div>
</div>
