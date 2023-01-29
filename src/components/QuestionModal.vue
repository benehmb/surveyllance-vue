<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <v-card class="modal" @click.stop>
      <v-card-title class="title">
        <h1>Question:</h1>
      </v-card-title>
      <v-card-text class="text">
        <v-row>
          <v-text-field id="questionInput" label="Question" required></v-text-field>
        </v-row>
        <v-row> The question you want to ask </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="askQuestion()">Ask Question</v-btn>
        <v-btn color="red" @click="$emit('close-modal')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { AskQuestion } from "@/hubs/participant-hub";
export default {
  name: "QuestionModal",
  methods: {
    askQuestion() {
      let question = document.getElementById("questionInput").value;
      AskQuestion(question);
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
}

.text {
  margin-left: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 10;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: left;
  background-color: white;
  width: 90%;
  height: fit-content;
  margin-top: 10%;
  padding: 60px 10px;
}
</style>
