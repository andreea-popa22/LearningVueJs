<script setup>
import { ref, reactive } from 'vue'
  
let state = reactive({count: 0})
const increment = ()=>{
	state = {
    count: state.count++
  }
}

const msg = ref('Hello World!')
console.log(msg.value)
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="increment">
    Increment Count
  </button>
</template>