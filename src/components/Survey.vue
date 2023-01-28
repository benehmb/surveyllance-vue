<template>
  <v-row>
    <v-col>
      <v-card :elevation="hover ? 16 : 2">
        <v-card-title>
          <v-icon>mdi-help-circle</v-icon>
          <a :style="'color: ' + (survey.isClosed ? 'black' : 'limegreen')"
            >{{ survey.title
            }}<a v-if="survey.isClosed" style="font-style: italic">(closed)</a></a
          >
        </v-card-title>
        <v-card-text>
          <div v-for="answer in survey.answers" :key="answer.id">
            <survey-answer-component
              :surveyAnswer="answer"
              :percentage="percentage(answer)"
            />
          </div>
        </v-card-text>
        <v-card-action>
          <v-btn :flat="true" text @click="$emit('close-survey')">Close Survey</v-btn>
          <v-btn :flat="true" color="red" text @click="$emit('remove-survey')"
            >Remove Survey</v-btn
          >
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import SurveyAnswerComponent from "@/components/SurveyAnswer.vue";
import { Survey } from "@/objects/Survey";
export default {
  name: "SurveyComponent",
  components: {
    SurveyAnswerComponent,
  },
  props: {
    survey: {
      type: Object as () => Survey,
      required: true,
    },
  },
  //calculate percentage of votes
  setup(props: any) {
    const percentage = (answer: any) => {
      let totalVotes = 0;
      props.survey.answers.forEach((answer: any) => (totalVotes += answer.votes));
      return (answer.votes / totalVotes) * 100;
    };
    return { percentage };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
