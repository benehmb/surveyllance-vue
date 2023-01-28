<template>
  <nav>
    <div class="nav-wrapper">
      <div class="bubble-wrapper">
        <ul class="bg-bubbles">
          <li v-for="n in 10" v-bind:key="n"></li>
        </ul>
      </div>
      <a class="brand-logo center">Welcome to <b>SURVEY</b>llance!</a>
    </div>
  </nav>
  <QuestionModal v-show="showQuestionModal" @close-modal="showQuestionModal = false" />
  <!--Container-->
  <v-container style="margin: inherit; max-width: inherit">
    <v-row no-gutters>
      <v-col>
        <v-card @click="showQuestionModal = true">
          <v-card-title><v-icon>mdi-plus</v-icon> Ask a question</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <ParticipantSurveyComponent />
    </v-row>
  </v-container>
</template>

<script>
import ParticipantSurveyComponent from "../components/ParticipantSurvey.vue";
import QuestionModal from "../components/QuestionModal.vue";
export default {
  name: "ParticipantView",
  components: {
    ParticipantSurveyComponent,
    QuestionModal,
  },
  data() {
    return {
      showQuestionModal: false,
    };
  },
};
</script>

<style src="../assets/styles/nav_bubble.css"></style>

<style></style>
