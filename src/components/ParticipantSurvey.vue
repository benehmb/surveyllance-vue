<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <v-icon>mdi-help-circle</v-icon>
          {{ survey.title }}
          <a v-if="survey.isClosed" style="font-style: italic">(closed)</a>
        </v-card-title>
        <v-card-text v-if="survey.isClosed || isSubmitet">
          <v-row v-for="answer in survey.answers" :key="answer.id">
            <v-col></v-col>
            <v-col>
              <v-progress-linear :model-value="15" color="blue"></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          <div v-for="answer in survey.answers" :key="answer.id">
            <v-radio-group v-model="answerRadio">
              <v-radio :label="answer.text" :value="answer.id" @click="selected = answer.id">
              </v-radio>
            </v-radio-group>
          </div>
        </v-card-text>
        <v-card-actions v-if="survey.isClosed || isSubmitet">
          <v-btn :flat="true" color="red" text @click="$emit('remove-survey')">
            Remove Survey</v-btn
          >
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn :flat="true" color="orange" text @click="$emit('vote', selected)" :disabled="selected == null"
            >Submit Survey</v-btn
          >
          <v-btn :flat="true" color="red" text @click="$emit('dismiss')">
            Dismiss</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Survey} from "@/objects/Survey";
export default {
  name: "ParticipantSurveyComponent",
  props: {
    survey: {
      type: Object as () => Survey,
      required: true,
    },
  },
  data() {
    return {
      isSubmitet: false,
      answerRadio: null,
      selected: null,
    };
  },
};
</script>
