<template>
  <Icon id="catche-icon" class="catche-icon" v-if="data.length" @click="toggle" style="z-index: 2147483645;" />
  <div id="catche-background" class="fixed top-0 left-0 bg-white h-screen w-screen transition-all duration-300"
    :class="show ? 'show opacity-80' : 'opacity-0 pointer-events-none'" @click="show=false"
    style="z-index: 2147483646;">
  </div>
  <SearchMenu id="catche-menu" v-if="data.length" :show="show" :data="data" style="z-index: 2147483647;" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from '../utils/supabase'
import Icon from './Icon.vue'
import SearchMenu from './SearchMenu.vue'

export default defineComponent({
  async mounted () {
    const scriptElement = document.querySelector('script[catche-key],script[catche-data]')
    let customDataPath = null
    if (scriptElement) {
      customDataPath = scriptElement.getAttribute("catche-data")
      this.catcheKey = scriptElement.getAttribute("catche-key") as string
    }
    if (customDataPath) {
      await this.loadCustomData(customDataPath)
    } else {
      await this.loadData()
    }
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      if ((event.ctrlKey || event.metaKey) && key === 'k') {
        event.preventDefault()
        this.show = !this.show
      } else if (key === 'Escape') {
        this.show = false
      }
    }, false)
  },
  components: {
    Icon,
    SearchMenu,
  },
  data () {
    return {
      catcheKey: '00000000-0000-0000-0000-000000000000',
      show: false,
      searcher: null as any,
      data: [] as any[],
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    async loadData () {
      let { data, error } = await supabase.from('webpages_free')
        .select()
        .eq('catche_key', this.catcheKey)
      if (error) {
        console.error(error)
        this.data = []
      } else {
        this.data = data as any[]
      }
    },
    async loadCustomData (customDataPath:string) {
      await fetch(customDataPath)
        .then(response => response.json())
        .then(data => this.data = data)
    }
  }
})
</script>
