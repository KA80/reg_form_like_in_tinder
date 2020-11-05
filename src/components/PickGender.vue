<template>
  <div>
    <h1>Пол</h1>
    <div v-for="gender of genders" v-bind:key="gender">
      <input type="radio" id="a" name="gender">
      <label for="a">{{ gender }}</label>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      genders: [
        'Мужчина',
        'Женщина',
        'Вертолет',
        'Еще один гендер'
      ]
    };
  },
  name: "PickGender"
}
</script>

<style scoped>
h1 {
  font-style: inherit;
}

</style>