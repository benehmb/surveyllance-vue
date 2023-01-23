<template>
  <v-container>
    <div class="wrapper">
      <!-- Head with _title and create- / join-buttons -->
      <div class="container">
        <h1>Welcome to <b>SURVEY</b>llance!</h1>
        <v-btn href="#/creator">Create new room</v-btn>
        <h2>OR</h2>
        <v-btn href="#/join">Join room</v-btn>
      </div>
      <ul class="bg-bubbles">
        <li v-for="n in 10"></li>
      </ul>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style src="../assets/styles/welcome_and_join.css">

</style>
