<template>
  <Registration></Registration>
</template>

<script>
import Registration from "@/components/Registration";

export default {
  name: 'App',
  components: {
    Registration
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Work+Sans);

body {
  background-image: url("assets/background.jpg");
  font-family: "Work Sans", "Segoe UI", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
