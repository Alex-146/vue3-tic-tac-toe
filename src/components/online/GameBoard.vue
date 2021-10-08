<template>
  <h1>Players online: {{ onlineCounter }}</h1>
</template>

<script>
import { emitter } from "@/sockets/index"

export default {
  data() {
    return {
      onlineCounter: 0,
    }
  },
  created() {
    emitter.on("update:onlineCounter", counter => {
      this.onlineCounter = counter
    })
  }
}
</script>

<style>

</style>