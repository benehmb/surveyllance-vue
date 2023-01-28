<template>
  <v-row>
    <v-col> </v-col>
    <v-col>
      <!--<v-progress-linear :value="surveyAnswer.votes"></v-progress-linear>-->
      <v-progress-linear :model-value="percentage" color="blue"></v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SurveyAnswers",
  props: {
    surveyAnswer: {
      type: Object,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
