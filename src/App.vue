<template>
  <div id="app">
    <PickGender></PickGender>
    <TextName></TextName>
    <br>
    <TextLastName></TextLastName>
    <br>
    <TextPhone></TextPhone>
    <br>
    <TextDescription></TextDescription>
    <br>
    <Submit></Submit>
    <Errors></Errors>

  </div>
</template>


<script>
import PickGender from '@/components/PickGender'
import TextName from '@/components/TextName'
import TextLastName from "@/components/TextLastName";
import TextPhone from '@/components/TextPhone'
import TextDescription from '@/components/TextDescription'
import Submit from '@/components/Submit'
import Errors from '@/components/Errors'

export default {
  name: 'App',
  components: {
    PickGender,
    TextName,
    TextLastName,
    TextPhone,
    TextDescription,
    Submit,
    Errors
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
