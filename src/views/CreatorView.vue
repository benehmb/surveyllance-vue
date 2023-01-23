<template>
  <!-- Nav Head with _title-->
  <nav>
    <div class="nav-wrapper">
      <div class="bubble-wrapper">
        <ul class="bg-bubbles">
          <li v-for="n in 10"></li>
        </ul>
      </div>
      <a class="brand-logo center">Welcome to <b>SURVEY</b>llance!</a>
    </div>
  </nav>
  <!-- Content -->
  <v-container style="margin: inherit; max-width: inherit">
    <v-row no-gutters>
      <v-col>
      <v-card :elevation="hover ? 16 : 2">
        <v-card-title><v-icon>mdi-plus</v-icon> Create new Survey</v-card-title>
      </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <div class="hr-sect">Recent Surveys</div>
    </v-row>
    <v-row>
      <v-row no-gutters>
        <v-col>
          <v-card :elevation="hover ? 16 : 2">
            <v-card-title><v-icon color="black">mdi-help-circle</v-icon> What is love?</v-card-title>
            <!-- Content of the Survey -->
            <v-card-text>
              <v-row>
                <v-col>
                  Baby don't hurt me
                </v-col>
                <v-col>
                  <v-progress-linear value="15"></v-progress-linear>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-row align="center">
      <div class="hr-sect">Questions</div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreatorView",
  mounted() {
    this.$refs.needHelp.innerHTML = "Me needs help";
  }
}

</script>

<style src="../assets/styles/nav_bubble.css">

</style>
<style src="../assets/styles/creator_style.css"></style>