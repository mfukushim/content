
# @nuxt/content customize to import ipfs doc directly


## Customize

- load a document whose root is the specified ipfs node directly as content

Other than that, same as the original.

## Consideration

- export static site to ipfs directly (customize or add module to nuxt)

## How to use

It is not publish to npm. use it in the development environment.

1. install and run ipfs node locally (e.g. install and run ipfs Desktop )
2. Clone this repository
3. at package/content ,take Link by yarn or npm
4. put link to own blog project
5. add ipfs node api endpoint and document root cid to nuxt.config.ts (nuxt.config.js)
6. $content('content path') change to $content('ipfs') in your project
7. build and run own blog project 

```bash
# link custom build
cd packages/content
yarn link

# link my nuxt/content project temporary
cd ~/my-blog-project
yarn link @nuxt/content
    
```

nuxt.config.ts
```ts
const config: NuxtConfig = {
  ...,
  content: {
    ... ,
    ipfsApiEndpoint: 'http://127.0.0.1:5002'  // your ipfs api endpoint (see ipfs node status)
  },
  publicRuntimeConfig: {
    ipfsRoot: 'QmX....' //  your ipfs markdown document root
  },
}
```

index.vue (Vuetify, TypeScript)
```vue
<template>
    <v-list>
      <v-list-item
        v-for="body in posts" :key="body.slug"
      >
        <v-list-item-title>
        {{body.parentCid}} <!-- body.cid is index.md.  article root path is body.parentCid -->
        </v-list-item-title>
        <v-list-item-content>
        <nuxt-content :document="body"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'Category'
})
export default class Category extends Vue {
  posts?: any[]

  async asyncData ({
    $content,
    $config,
    params
  }: Context) {
    const query = $content('ipfs',{deep: true}).where({
      categories: { $contains: params.category }
    })
      .sortBy('date', 'desc')
    const posts = await query.fetch()
    return {
      posts
    }
  }

}

```

## ipfs document structure

sample structure  

```
document root (DAG-cbor node ,bafyreighellwstevjhzeow5ktf3sn3sdgivscqdebbu5i6375xzlilhcle)
│  
├─2021-04-24-2021-04-24付近 (dag-pb/UnixFS, QmQi911LgFcckMprMTprfETdzt76pyuvKpXCvuqSDD1kTx)
│      index.md
│      
├─2021-04-25-ipfsでブログを作ってみてわかったこと (dag-pb/UnixFS, QmZDeR9HvR1wpWXyXMiQaCAFQ241NNGfzEuNNXeh9qNaj1)
│      index.md
│      
└─2021-04-26-学研電子辞典シリーズ-楽しむ辞典-現代新国語辞典 (dag-pb/UnixFS, Qmd1DEyZVCHrCjaKHqWkLAo3xmRAzQRgjKmZeHr1RTWiDC)
    │  index.md
    │  
    └─images
            PXL_20210426_035117085-1024x1008.jpg
            PXL_20210426_035117085.jpg
            PXL_20210426_035143199-761x1024.jpg
            PXL_20210426_035143199.jpg


```
