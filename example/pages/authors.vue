<template>
  <div>
    <nuxt-content :document="markdown" />
  </div>
</template>

<script lang="ts">
export default {
  // @ts-ignore
  async asyncData ({ $content }) {
    const markdown = await $content('authors-page').fetch()
    return {
      markdown
    }
  }
}
</script>
