<template>
    <v-row>
        <v-col>
            {{answerText}}
        </v-col>
        <v-col>
            <v-progress-linear value="30"></v-progress-linear>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "SurveyAnswers",
    props: {
        answerText: String,
    },
    data() {
        return {
            answer: this.answerText,
        };
    },
};
</script>

<style>
</style>