<template>
  <v-row>
    <v-col>
    <v-card>
      <v-card-title>
        {{question.title}}
      </v-card-title>
      <v-card-actions>
        <v-btn :flat="true" @click="$emit('remove-question')">Remove Question</v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Question } from "@/objects/Question";

export default {
  name: "QuestionComponent",
  props: {
    question: {
      type: Object as () => Question,
      required: true
    }
  }
}
</script>