<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <v-card class="modal" @click.stop>
      <v-card-title>
        <h3>Create new Survey</h3>
      </v-card-title>
      <v-card-text>
        <v-form id="surveyForm">
          <v-row>
          <h4 >Question:</h4>
          </v-row>
          <v-row>
            <v-text-field id="question" type="text" label="Question" hint="The question you want to ask"/>
          </v-row>
          <v-row>
          <h4>Answers:</h4>
          </v-row>
          <v-row :id="'answer-box' + n" style="align-items: center; justify-content: center" v-for="n in answers" v-bind:key="n">
            <v-text-field :id="'answer' + n" :label="'Answer ' + n"/>
            <v-icon color="red" size="40" style="cursor: pointer" @click="removeAnswer()">mdi-delete-forever</v-icon>
          </v-row>
        </v-form>
        <v-row>
          <v-btn @click="addAnswer()" v-show="answers < maxAnswers"><v-icon color="green" >mdi-plus</v-icon></v-btn>
        </v-row>
      </v-card-text>
        <v-btn type="submit" @click="createSurvey()"> <!-- onclick="document.getElementsByTagName('form')[0].submit()" -->
          Create Survey
        </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CreateNewSurveyModal",
  data() {
    return {
      answers: 2,
      maxAnswers: 5,
    };
  },
  methods: {
    addAnswer() {
      if (this.answers < this.maxAnswers)
      this.answers++;
    },
    removeAnswer(){
      if (this.answers > 2)
      this.answers--;
    },
    createSurvey(){
      let survey = {
        title: document.getElementById("question").value,
        text: []
      };
      for (let i = 1; i <= this.answers; i++) {
        survey.text.push(document.getElementById("answer" + i).value);
      }

      this.$emit('newSurvey', survey);
      this.$emit('close-modal');
    }
  },
}
</script>

<style scoped>
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
  text-align: center;
  background-color: white;
  width: 90%;
  height: fit-content;
  margin-top: 10%;
  padding: 60px 10px;
}

h4 {
  padding: 10px 0;
}
</style>