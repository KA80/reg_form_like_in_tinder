<template>
  <form @submit="submitForm">
    <div v-for="gender in genders" v-bind:key="gender">
      <label>
        <input type="radio" name="picked_gender" v-model="picked_gender"
               :value="gender">
      </label>{{ gender }}
    </div>
    <br>
    <label>
      <input placeholder="Введите имя" v-model="name">
    </label>
    <br>
    <p v-if="errors.name">{{ errors.name }}</p>
    <label>
      <input placeholder="Введите фамилию" v-model="last_name">
    </label>
    <br>
    <p v-if="errors.last_name">{{ errors.last_name }}</p>
    <label>
      <input placeholder="Введите свою почту" v-model="mail">
    </label>
    <br>
    <p v-if="errors.mail">{{ this.errors.mail }}</p>
    <label>
      <input placeholder="Введите номер своего телефона" v-model="phone_number">
    </label>
    <br>
    <p v-if="errors.phone_number">{{ this.errors.phone_number }}</p>
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

      picked_gender: 'deer',
      name: '',
      last_name: '',
      mail: '',
      phone_number: '',
      text_description: '',

      errors: {
        name: '',
        last_name: '',
        mail: '',
        phone_number: ''
      }
    }
  },
  methods: {
    submitForm(event) {
      let found_error = false;

      let validator = this.nameValidator(this.name, "Напишите свое имя", "Неправильно введено имя")
      found_error = validator[0] === undefined ? found_error : true
      this.errors.name = validator[1]
      validator = this.nameValidator(this.last_name, "Напишите свою фамилию", "Неправильно введена фамилия")
      found_error = validator[0] === undefined ? found_error : true
      this.errors.last_name = validator[1]
      found_error = this.emailValidator() === undefined ? found_error : true
      found_error = this.phoneValidator() === undefined ? found_error : true

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
      this.picked_gender = 'deer'
      this.name = ''
      this.last_name = ''
      this.mail = ''
      this.phone_number = ''
      this.text_description = ''
    },


    nameValidator(name, emptyError = '', incorrectError = '') {
      let re = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/
      if (name === '') {
        return [true, emptyError]
      }
      if (!re.test(name)) {
        return [true, incorrectError]
      }
      return [undefined, '']
    },


    emailValidator() {
      if (this.mail === '') {
        this.errors.mail = "Введите почту"
        return true
      } else if (!this.isCorrectMail(this.mail)) {
        this.errors.mail = "Почта введена неверно"
        return true
      } else if (this.users.find(e => e.mail === this.mail)) {
        this.errors.mail = "Эта почта уже зарегистрирована"
        return true
      }
      this.errors.mail = ""
    },
    phoneValidator() {
      if (this.phone_number === '') {
        this.errors.phone_number = "Введите номер телефона"
        return true
      } else if (!this.isCorrectNumber(this.phone_number)) {
        this.errors.phone_number = "Номер телефона введен неправильно. Пример номера: +7999111-11-66"
        return true
      } else if (this.users.find(e => e.phone_number === this.phone_number)) {
        this.errors.phone_number = "Этот номер уже зарегистрирован"
        return true
      }
      this.errors.phone_number = ""
    },


    isCorrectMail(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    isCorrectNumber(num) {
      let re = /^[0-9+]{1,}[0-9-]{3,15}$/
      return re.test(num)
    },
  },
  beforeMount() {
    this.$store.dispatch('getUsers')
  }
}
</script>

<style>
</style>