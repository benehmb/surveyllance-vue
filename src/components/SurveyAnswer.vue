<template>
    <v-row>
        <v-col>
            {{surveyAnswer.text}}
        </v-col>
        <v-col>
            <!--<v-progress-linear :value="surveyAnswer.votes"></v-progress-linear>-->
            <v-progress-linear :model-value="percentage" color="blue"></v-progress-linear>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import {SurveyAnswer} from "@/objects/SurveyAnswer";

export default {
    name: "SurveyAnswers",
  props: {
    surveyAnswer: {
      type: Object as () => SurveyAnswer,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    }
  },
};
</script>

<style scoped>
.v-progress-linear__bar, .v-progress-linear__bar__determinate {
  transition: none;
}
</style>