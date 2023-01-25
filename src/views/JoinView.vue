<template>
  <div class="wrapper">
    <!-- Head with title and create- / join-buttons -->
    <div class="container">
      <h1>Welcome to <b>SURVEY</b>llance!</h1>
      <h3>Join room by entering Room-Code below:</h3>
      <form>
        <div>
          <v-text-field id="joinId" type="text" label="Join-ID" />
        </div>
      </form>
      <!--TODO: Use form submit, because pressing 'ENTER' reloads page without arguments-->
      <v-btn>Join room</v-btn>
    </div>
    <ul class="bg-bubbles">
      <li v-for="n in 10" v-bind:key="n"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "JoinView"
}
</script>

<style src="../assets/styles/welcome_and_join.css" scoped>

</style>