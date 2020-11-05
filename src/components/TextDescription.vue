<template>
  <label>
    <textarea rows="9 " placeholder="Type there about you..." v-model="description">
    </textarea>
  </label>
</template>

<script>
export default {
  name: "TextDescription",
  data() {
    return {
      description: ''
    }
  }
}
</script>

<style scoped>

</style>