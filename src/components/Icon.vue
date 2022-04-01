<template>
  <div class="fixed right-10 bottom-10 bg-gray-800 rounded-full p-2 drop-shadow-lg cursor-pointer border border-gray-100 border-2 text-gray-100">
    <SearchIcon class="h-6 w-6" />
  </div>
</template>

<script lang="ts">
import { SearchIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SearchIcon,
  }
})
</script>
