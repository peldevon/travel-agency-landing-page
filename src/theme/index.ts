import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Montserrat', sans-serif" },
        body: { value: "'Open Sans', sans-serif" },
      },
      colors: {
        brand: {
          charcoal: { value: "#2C2C2C" },
          white: { value: "#FAFAFA" },
          gold: { value: "#C9A449" },
          navy: { value: "#152852" },
          grey: { value: "#E5E5E5" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          value: { base: "{colors.brand.navy}", _dark: "{colors.brand.gold}" },
        },
        secondary: {
          value: { base: "{colors.brand.grey}", _dark: "{colors.brand.charcoal}" },
        },
        accent: {
          value: "{colors.brand.gold}",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
