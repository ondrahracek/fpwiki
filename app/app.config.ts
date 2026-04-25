// Nuxt UI v4 semantic role mapping. Token values come from app/assets/css/main.css
// (@theme block). This is the single source of truth for component theming —
// global Nuxt UI overrides go here under ui.<component>; per-instance tweaks go
// on the component's :ui prop.
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'fp-purple',
      secondary: 'fp-red',
      neutral: 'paper',
    },
  },
})
