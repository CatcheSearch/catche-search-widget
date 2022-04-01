<template>
  <div class="relative flex gap-4 p-4">
    <div class="flex items-center pointer-events-none">
      <SearchIcon class="h-7 w-7 text-gray-400" aria-hidden="true" />
    </div>
    <input ref="input" v-model="inputValue" type="text"
      placeholder="Search..."
      class="focus:ring-0 focus:border-0 focus-visible:outline-none p-0 w-full bg-transparent border-0 text-lg" />
    <div class="hidden sm:flex absolute inset-y-0 right-4 text-xs text-gray-300 justify-center items-center">
      <span id="catche-shortcut" class="border rounded flex justify-center items-center py-0.5 px-1">{{ ctrlKey }} + K</span>
    </div>
  </div>
</template>

<script lang="ts">
import { SearchIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  components: {
    SearchIcon,
  },
  data () {
    return {
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.modelValue
      },
      set (modelValue:string) {
        this.$emit('update:modelValue', modelValue)
      }
    },
    ctrlKey ():string {
      let platform = ''
      if (navigator.platform) {
        platform = navigator.platform.toLowerCase()
      } else if (navigator.userAgentData) {
        platform = navigator.userAgentData.platform.toLowerCase()
      }
      if (platform.includes('mac') || platform.includes('iphone') || platform.includes('ipad')) return '⌘'
      else return 'Ctrl'
    },
  },
  methods: {
    focus () {
      (this.$refs["input"] as HTMLInputElement).focus()
    },
    unfocus () {
      (this.$refs["input"] as HTMLInputElement).blur()
    }
  }
})
</script>