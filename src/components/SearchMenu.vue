<template>
  <div class="font-sans w-full sm:w-128 max-w-full bg-white shadow-catche fixed top-0 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl flex flex-col divide-y overflow-hidden"
    :class="[show ? 'opacity-100' : 'opacity-0 pointer-events-none', open ? 'h-96' : 'h-[3.75rem]']"
    style="transition: opacity 300ms, height 300ms;">
    <SearchBox class="catche-input" v-model="query" ref="searchBox" />
    <Results class="h-96 overflow-y-scroll" :results="results" @close="close" :selected="selected" />
    <Branding />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { escapeHtml } from "@vue/shared"
import Minisearch, { SearchResult } from 'minisearch'
import { initSearch, highlightMatch } from '../utils/search'
import SearchBox from './SearchBox.vue'
import Results from './Results.vue'
import Branding from './Branding.vue'

export default defineComponent({
  async mounted () {
    this.searcher = await initSearch(this.data)
    document.addEventListener('keydown', event => {
      const key = event.key
      if (key === 'ArrowUp') {
        event.preventDefault()
        this.selected = Math.max(0, this.selected - 1)
      } else if (key === 'ArrowDown') {
        event.preventDefault()
        this.selected = Math.min(Math.max(this.results.length - 1, 0), this.selected + 1)
      } else if (key === 'Enter') {
        event.preventDefault()
        const destination = this.results[this.selected].url
        this.query = ''
        this.selected = -1
        this.open = false
        this.$emit('close')
        setTimeout(() => window.location.href = destination, 10)
      }
    }, false)
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: [],
    }
  },
  components: {
    SearchBox,
    Results,
    Branding,
  },
  watch: {
    query(newQuery) {
      this.selected = 0
      if (this.debounceTimerId) {
        clearTimeout(this.debounceTimerId)
      }
      if (!newQuery) {
        this.open = false
      } else {
        this.open = true
        this.debounceTimerId = setTimeout(() => {
          this.search()
        }, this.debounceTimeout)
      }
    },
    show (newValue) {
      if (newValue) {
        (this.$refs.searchBox as typeof SearchBox).focus()
      } else {
        (this.$refs.searchBox as typeof SearchBox).unfocus()
      }
    }
  },
  data () {
    return {
      open: false,
      query: '',
      searcher: null as unknown as Minisearch,
      numResults: 10,
      results: [] as any[],
      selected: 0,
      debounceTimerId: null as unknown as NodeJS.Timeout,
      debounceTimeout: 50,
    }
  },
  methods: {
    search () {
      const startSearchTime = performance.now()
      const andResults = this.searcher.search(this.query, {
        prefix: (term:string) => term.length <= 3,
        fuzzy: (term:string) => term.length > 3 ? 0.1 : false,
        combineWith: 'AND',
      })
      let orResults = [] as SearchResult[]
      if (andResults.length < this.numResults) {
        orResults = this.searcher.search(this.query, {
          prefix: (term:string) => term.length <= 3,
          fuzzy: (term:string) => term.length > 3 ? 0.3 : false,
          combineWith: 'OR',
        }).filter((result:any) => !andResults.map((result:any) => result.url).includes(result.url))
      }
      this.results = andResults.concat(orResults).slice(0, this.numResults)
        .map((result:SearchResult) => {
          return {
            url: result.url || '',
            title: highlightMatch(this.query, escapeHtml(result.title)).highlight || '',
            text: highlightMatch(this.query, escapeHtml(result.text), 3, 10).highlight || '',
          }
        })
      this.updateDebounce(performance.now() - startSearchTime)
    },
    close () {
      this.open = false
      this.query = ''
      this.$emit('close')
    },
    updateDebounce(time:number) {
      this.debounceTimeout = 0.9 * this.debounceTimeout + 0.1 * time
    },
  }
})
</script>
