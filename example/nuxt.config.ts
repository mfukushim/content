import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  modules: ['@nuxt/content'],
  components: true,
  hooks: {
    'content:file:beforeInsert': async (document, database) => {
      if (document.extension === '.json' && document.body) {
        const data = await database.markdown.toJSON(document.body.toString())

        Object.assign(document, data)
      }
    }
  },
  content: {
    nestedProperties: ['categories.slug'],
    extendParser: {
      '.custom': file => ({
        body: file.split('\n').map(line => line.trim())
      })
    },
    markdown: {
      remarkPlugins: [
        '~/utils/contributors'
      ]
    },
    ipfsApiEndpoint: 'http://127.0.0.1:5002'
  },
  publicRuntimeConfig: {
    ipfsRoot: 'bafyreid5xfsyrpldwtuwyxpxhnsvuoyefeadydcgqg34s54a2pxieif3sa'
  },
  generate: {}
}

export default config
