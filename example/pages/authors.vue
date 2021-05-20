<template>
  <div>
    <nuxt-content :document="markdown" />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
export default {
  // @ts-ignore
  async asyncData ({ $content }:Context) {
    const markdown = await $content('authors-page').fetch()
    return {
      markdown
    }
  }
}
</script>
