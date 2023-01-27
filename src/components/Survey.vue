<template>
    <v-row>
        <v-col>
            <v-card :elevation="hover ? 16 : 2">
                <v-card-title>
                    <v-icon>mdi-help-circle</v-icon>
                    {{title}}
                </v-card-title>
                <v-card-text>
                    <SurveyAnswers v-for="x in text" 
                    :key="x.id"
                    :answerText="x"
                     />
                </v-card-text>
                <v-card-action>
                    <v-btn :flat="true" text>Close Survey</v-btn>
                    <v-btn :flat="true" text>Remove Survey</v-btn>
                </v-card-action>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SurveyAnswers from "../components/SurveyAnswers";
export default {
    name: "SurveyComponent",
    props: ["surveytitle", "surveytext"],
    data() {
        return{
            title: this.surveytitle,
            text: this.surveytext,
        };
    },
    components: {
        SurveyAnswers
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>