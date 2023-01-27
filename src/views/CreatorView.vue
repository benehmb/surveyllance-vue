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
      <div>
          <SurveyComponent v-for="survey in surveys"
                           :key="survey.id" 
                           :surveytitle="survey.title" 
                           :surveytext="survey.text" />
      </div>
      <v-row align="center">
          <div class="hr-sect">Questions</div>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import SurveyComponent from "../components/Survey.vue"
import CreateNewSurveyModal from "../components/CreateNewSurveyModal.vue";
import { NewSurvey, surveys } from "@/hubs/creator-hub";
import { Survey } from "@/objects/Survey";

export default {
        name: "CreatorView",
        data() {
            return {
                 surveys,
              showModal: false,
            };
        },
        components: {
          CreateNewSurveyModal,
            SurveyComponent
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
      e.text.forEach((text: string) => survey.answers.push({id: "", text: text, votes: 0}));
      NewSurvey(survey);
      }
  }
}

</script>

<style src="../assets/styles/nav_bubble.css">

</style>
<style src="../assets/styles/creator_style.css" scoped></style>