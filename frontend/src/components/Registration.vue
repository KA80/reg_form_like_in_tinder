<template>
  <form @submit="submitForm">
    <div v-for="gender in genders" v-bind:key="gender">
      <label>
        <input type="radio" name="picked_gender" v-model="picked_gender"
               :value="gender">
      </label>{{ gender }}
    </div>
    <br>
    <p v-if="errors.picked_gender">Вы не выбрали пол!</p>
    <label>
      <input placeholder="Введите имя" v-model="name">
    </label>
    <br>
    <p v-if="errors.name">Напишите свое имя</p>
    <label>
      <input placeholder="Введите фамилию" v-model="last_name">
    </label>
    <br>
    <p v-if="errors.last_name">Напишите свою фамилию</p>
    <label>
      <input placeholder="Введите свою почту" v-model="mail">
    </label>
    <br>
    <p v-if="errors.mail">Введите почту!</p>
    <label>
      <input placeholder="Введите номер своего телефона" v-model="phone_number">
    </label>
    <br>
    <p v-if="errors.phone_number">Введи номер телефона!</p>
    <label>
      <textarea rows="9" placeholder="Напишите немного о себе"
                v-model="text_description"></textarea>
    </label>
    <br>
    <input type="submit" value="submit">
  </form>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Registration",
  computed: mapGetters(['users']),
  data() {
    return {
      genders: [
        'male',
        'female',
        'deer',
        'yet another gender'
      ],

      picked_gender: '',
      name: '',
      last_name: '',
      mail: '',
      phone_number: '',
      text_description: '',

      errors: {
        picked_gender: false,
        name: false,
        last_name: false,
        mail: false,
        phone_number: false
      }
    }
  },
  methods: {
    submitForm(event) {
      let found_error = false
      if (this.picked_gender === '') {
        this.errors.picked_gender = true
        found_error = true
      }
      if (this.name === '') {
        this.errors.name = true
        found_error = true
      }
      if (this.last_name === '') {
        this.errors.last_name = true
        found_error = true
      }
      if (this.mail === '') {
        this.errors.mail = true
        found_error = true
      }
      if (this.phone_number === '') {
        this.errors.phone_number = true
        found_error = true
      }

      if (!found_error) {
        this.createUser()
      }
      event.preventDefault()
    },
    createUser() {
      this.$store.dispatch('createUser', {
        mail: this.mail,
        phone_number: this.phone_number
      })
      this.picked_gender = ''
      this.name = ''
      this.last_name = ''
      this.mail = ''
      this.phone_number = ''
      this.text_description = ''
    }
  },
  beforeMount() {
    this.$store.dispatch('getUsers')
  }
}
</script>

<style>
</style>