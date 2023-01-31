import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";

const site = "https://nowrom.pages.dev";

// https://astro.build/config
export default defineConfig({
  site: site,
  integrations: [tailwind(), prefetch(), svelte()],
  output: "server",
  adapter: cloudflare(),
});
