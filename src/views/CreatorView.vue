<template>
  <!-- Nav Head with _title-->
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
  <CreateNewSurveyModal v-show="showModal" @close-modal="showModal = false" @newSurvey="handleNewSurvey($event)"/>
  <!-- Content -->
  <v-container style="margin: inherit; max-width: inherit">
      <v-row no-gutters>
          <v-col>
              <v-card @click="showModal = true">
                  <v-card-title ><v-icon>mdi-plus</v-icon> Create new Survey</v-card-title>
              </v-card>
          </v-col>
      </v-row>
      <v-row align="center">
          <div class="hr-sect">Recent Surveys</div>
      </v-row>
    <div v-for="survey in surveys" :key="survey.id">
          <SurveyComponent :survey="survey" @close-survey="closeSurvey(survey.id)" @remove-survey="removeSurvey(survey.id)"/>
      </div>
      <v-row align="center">
          <div class="hr-sect">Questions</div>
      </v-row>
      <div v-for="question in questions" :key="question.id">
          <QuestionComponent :question="question" @remove-question="removeQuestion(question.id)"/>
      </div>
  </v-container>
</template>

<script lang="ts">
import SurveyComponent from "../components/Survey.vue"
import CreateNewSurveyModal from "../components/CreateNewSurveyModal.vue";
import QuestionComponent from "../components/Question.vue";
import {NewSurvey, surveys, questions, RemoveQuestion, CloseSurvey, RemoveSurvey} from "@/hubs/creator-hub";
import { Survey } from "@/objects/Survey";
//import { Question } from "@/objects/Question";

export default {
        name: "CreatorView",
        data() {
            return {
                 surveys,
                questions,
              showModal: false,
            };
        },
        components: {
          CreateNewSurveyModal,
          SurveyComponent,
          QuestionComponent
        },
  methods:{
    handleNewSurvey(e:any){
      let survey: Survey = {
        id: "",
        title: "",
        answers: [],
        isClosed: false,
      };
      survey.title = e.title;
      e.answers.forEach((text: string) => survey.answers.push({id: "", text: text, votes: 0}));
      NewSurvey(survey);
      },
      removeQuestion(id: string){
        RemoveQuestion(id);
      },
      closeSurvey(id: string){
        CloseSurvey(id);
      },
      removeSurvey(id: string){
        RemoveSurvey(id);
      }
  }
}

</script>

<style src="../assets/styles/nav_bubble.css">

</style>
<style src="../assets/styles/creator_style.css" scoped></style>