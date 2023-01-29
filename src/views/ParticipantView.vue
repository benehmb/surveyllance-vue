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
  <!-- Popup -->
  <QuestionModal v-show="showQuestionModal" @close-modal="showQuestionModal = false" @new-question="handleNewQuestion($event)"/>
  <!--Container-->
  <v-container style="margin: inherit; max-width: inherit">
    <v-row no-gutters>
      <v-col>
        <v-card @click="showQuestionModal = true">
          <v-card-title><v-icon>mdi-plus</v-icon> Ask a question</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <div class="hr-sect">Active Surveys</div>
    </v-row>
      <div v-for="survey in surveysToVote" :key="survey.id">
        <ParticipantSurveyComponent :survey="survey" @vote="vote(survey.id, $event)" @dismiss="dismiss(survey.id)"/>
      </div>
    <v-row align="center">
      <div class="hr-sect">Old Surveys</div>
    </v-row>
    <div v-for="survey in surveys" :key="survey.id">
      <SurveyComponent :survey="survey" :hide-close="true"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import QuestionModal from "../components/QuestionModal.vue";
import ParticipantSurveyComponent from "../components/ParticipantSurvey.vue";
import SurveyComponent from "../components/Survey.vue";
import {surveysToVote, surveys, AskQuestion, Vote, Dismiss} from "@/hubs/participant-hub";
import {Question} from "@/objects/Question";
export default {
  name: "ParticipantView",
  components: {
    QuestionModal,
    ParticipantSurveyComponent,
    SurveyComponent
  },
  data() {
    return {
      showQuestionModal: false,
      surveysToVote,
      surveys,
    };
  },
  methods: {
    handleNewQuestion(questionTxt: string) {
      let question: Question = {
        id: "",
        title: questionTxt,
      };
      AskQuestion(question);
    },
    vote(surveyId: string, answerId : string) {
      Vote(surveyId, answerId);
    },
    dismiss(surveyId: string) {
      Dismiss(surveyId);
    }
  },
};
</script>

<style src="../assets/styles/nav_bubble.css"></style>

<style src="../assets/styles/divider_style.css" scoped></style>
