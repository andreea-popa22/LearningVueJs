<script setup>
import { ref } from 'vue'

const header = ref('Shopping List App')
const items = ref([
  {id:"1", label: "10 hats"},
  {id:"2", label: "2 boardgames"},
  {id:"3", label: "15 cups"}
])
</script>

<template>
  <h1>{{ header }}</h1>
  <ul>
    <li v-for="({id, label}, index) in items" :key="id">{{label}}</li>
  </ul>
</template>