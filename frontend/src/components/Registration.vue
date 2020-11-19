<template>
  <form @submit="submitForm" class="container-fluid">
    <h1>Форма регистрации</h1>
    <div class="columns">
      <div class="column col-md-auto">
        <div v-for="gender in genders" v-bind:key="gender">
          <label>
            <input type="radio" name="picked_gender" v-model="picked_gender"
                   :value="gender">
          </label>
          <span> {{ gender }} </span>
        </div>
        <label>
          <input placeholder="Введите имя " v-model="name" class="bg-dark">
        </label>
        <label>
          <input placeholder="Введите фамилию " v-model="last_name"
                 class="bg-dark ">
        </label>
        <br>
        <span v-if="errors.last_name" class="text-error">{{
            errors.last_name
          }}</span>
        <span v-if="errors.name" class="text-error">{{ errors.name }}</span>
        <br>
        <label>
          <input placeholder="Введите свою почту" v-model="mail"
                 class="bg-dark inputs  ">
        </label>
        <br>
        <span v-if="errors.mail" class="text-error">{{ this.errors.mail }}</span>
        <br>
        <label>
          <input placeholder="Введите номер своего телефона"
                 v-model="phone_number" class="bg-dark inputs">
        </label>
        <br>
        <span v-if="errors.phone_number"
              class="text-error">{{ this.errors.phone_number }}</span>
        <br>
        <label>
            <textarea placeholder="Напишите немного о себе"
                      v-model="text_description" class="bg-dark"></textarea>
        </label>
        <br>
        <input type="submit" value="submit" class="btn btn-success">
      </div>
    </div>
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

      let validator = this.nameValidator(this.name, "Напишите свое имя ", "Неправильно введено имя ")
      found_error = validator[0] === undefined ? found_error : true
      this.errors.name = validator[1]
      validator = this.nameValidator(this.last_name, "Напишите свою фамилию ", "Неправильно введена фамилия ")
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
      let re = /^([А-Я][а-яё]{1,23}|[A-Z][a-z]{1,23})$/
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
        this.errors.mail = "Введите почту "
        return true
      } else if (!this.isCorrectMail(this.mail)) {
        this.errors.mail = "Почта введена неверно "
        return true
      } else if (this.users.find(e => e.mail === this.mail)) {
        this.errors.mail = "Эта почта уже зарегистрирована "
        return true
      }
      this.errors.mail = ""
    },
    phoneValidator() {
      if (this.phone_number === '') {
        this.errors.phone_number = "Введите номер телефона "
        return true
      } else if (!this.isCorrectNumber(this.phone_number)) {
        this.errors.phone_number = "Номер телефона введен неправильно. Пример номера: +79991234567 "
        return true
      } else if (this.users.find(e => e.phone_number === this.phone_number)) {
        this.errors.phone_number = "Этот номер уже зарегистрирован "
        return true
      }
      this.errors.phone_number = ""
    },


    isCorrectMail(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    isCorrectNumber(num) {
      let re = /^[+][0-9]{10,15}$/
      return re.test(num)
    },
  },
  beforeMount() {
    this.$store.dispatch('getUsers')
  }
}
</script>

<style>
textarea {
  width: 25%;
  height: 200px;
  resize: vertical;
}
.inputs {
  width: 20%;
}
</style>