<template>
  <div>
    <nuxt-content :document="markdown" />
  </div>
</template>

<script >
export default {
  async asyncData ({ $content }) {
    const markdown = await $content('authors-page').fetch()
    return {
      markdown
    }
  }
}
</script>
