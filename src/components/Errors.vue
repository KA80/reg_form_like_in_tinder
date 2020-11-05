<template>
  <div v-if="errors.length" @submit="checkForm">
    <b>ggg</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import name from './TextName'
import last_name from './TextLastName'
import phone from './TextPhone'

export default {
  data() {
    return {
      errors: []
    }
  },
  methods: {
    checkForm: function (e) {
      console.log("fefe")
      this.errors = [];
      if (!name.data().name) {
        this.errors.push('Print your name')
      }
      if (!last_name.data().last_name) {
        this.errors.push('Print your last name')
      }
      if (!phone.data().phone) {
        this.errors.push('Print your phone number')
      }

      e.preventDefault();
    }
  }
}
</script>

<style scoped>

</style>