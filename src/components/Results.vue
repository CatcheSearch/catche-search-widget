<template>
  <div class="text-gray-700 flex flex-col divide-y">
    <a v-for="(result, i) in results" :key="i"
      :id="`result-${i}`"
      class="px-5 py-4 hover:bg-gray-100 cursor-pointer flex flex-col gap-1"
      :class="selected === i ? 'selected bg-gray-100' : ''"
      :href="result.url" @click="$emit('close')">
        <h1 class="text-xl truncate" v-html="result.title" />
        <p class="truncate" v-html="result.text" />
    </a>
    <div v-if="results.length"></div>
    <a v-else class="px-5 py-4">
      No results
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Result } from '../utils/utils'

export default defineComponent({
  emits: [
    'close',
  ],
  props: {
    results: {
      type: Array as PropType<Result[]>,
      default: [],
    },
    selected: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    selected (newSelection, oldSelection) {
      if (newSelection === -1) return
      if (newSelection !== oldSelection) {
        if (process.env.NODE_ENV === 'development') {
          document.getElementById(`result-${newSelection}`)?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"})
        } else {
          const shadowroot = document.getElementById('catche-search')?.shadowRoot
          shadowroot?.getElementById(`result-${newSelection}`)?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"})
        }
      }
    }
  },
})
</script>
