<template>
  <v-container>
    <div class="wrapper">
      <!-- Head with _title and create- / join-buttons -->
      <div class="container">
        <h1>Welcome to <b>SURVEY</b>llance!</h1>
        <v-btn @click="this.$router.push({name: 'creator'})" style="width: 100%; font-size: 2em;">Create new room</v-btn>
        <h2>OR</h2>
        <v-btn @click="this.$router.push({name: 'join'})" style="width: 100%; font-size: 2em;">Join room</v-btn>
      </div>
      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/styles/welcome_and_join.css" scoped>

</style>