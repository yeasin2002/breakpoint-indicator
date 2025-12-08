import { presetWind } from "@unocss/preset-wind3";
import { defineConfig } from "unocss";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  presets: [
    presetWind(),
    presetAnimations(),
    presetShadcn({
      color: "neutral",
    }),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        "(components|lib|app)/**/*.{js,ts,tsx}",
      ],
    },
  },
});
