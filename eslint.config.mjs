// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
// @ts-ignore
import tailwind from 'eslint-plugin-tailwindcss'

export default withNuxt({
  rules: {
    "@typescript-eslint/no-explicit-any": "off"
  },
},
...tailwind.configs["flat/recommended"],
)
