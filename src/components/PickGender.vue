<template>
  <div>
    <h1>Пол</h1>
    <div v-for="gender of genders" v-bind:key="gender">
      <label >
        <input type="radio" v-model="picked_gender" name="picked-gender" :value="gender">
      </label> {{ gender }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genders: [
        'Male',
        'Female',
        'Helicopter',
        'Yet another gender'
      ],
      picked_gender: 'Helicopter'
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