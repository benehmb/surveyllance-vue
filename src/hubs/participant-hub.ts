import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import {Survey} from "@/objects/Survey";
import {SurveyAnswer} from "@/objects/SurveyAnswer";
import {ref, Ref, UnwrapRef} from "vue";
import survey from "@/components/Survey.vue";

// <editor-fold desc="Websocket-Connection">
// Connect to Websocket

let joinId :string|null;

if (typeof(Storage) !== "undefined") {
    //Get value from localStorage (See readme.md for more details what to save in the localStorage)
    const type : boolean|undefined = convertToBoolean(sessionStorage.getItem("type"));
    joinId = sessionStorage.getItem("joinId");

    //Check if type and joinId are set
    if ((type === null || type === undefined) || (joinId === null || joinId === undefined)) {
        //TODO: Show error message (Via toast?) "You need to join a room first!"
        throw new Error("No room or joinId defined");
    }

    //Check if type is set to "participant"
    if (type !== false){
        //TODO: Show error message (Via toast?) "You are not a participant. Close your room and join another or restart your Browser!"
        throw new Error("Not a participant");
    }
} else {
    alert("Sorry, your browser does not support Web Storage...");
    throw new Error("No browser-support for Web Storage");
}

const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/participant")
    .configureLogging(LogLevel.Information)
    .build();


async function start() {
    if (joinId === null) throw new Error("No joinId defined");
    try {
        await connection.start();
        console.log("SignalR Connected.");
        JoinRoom(joinId);
        console.log("Joined SURVEYllance-Session with JoinId: " + joinId);
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

// Start the connection.
start();

// </editor-fold>

export const surveysToVote : Ref<UnwrapRef<Survey[]>> = ref([]);

export const surveys : Ref<UnwrapRef<Survey[]>> = ref([]);

//<editor-fold desc="API-Methods">

//<editor-fold desc="Client">

//<editor-fold desc="Survey">

/**
 * Will be called by the server when the results of a survey change
 * @param {string} surveyId ID of the survey
 * @param {SurveyAnswer} answer the answer, which has changed
 */
connection.on("OnNewSurveyResult", (surveyId:string, answer:SurveyAnswer) => {
    if (surveysToVote.value != undefined) {
        // @ts-ignore
        surveys.value.find(survey => survey.id === surveyId).OnNewSurveyResult(answer);
    }

});

/**
 * Will be called by the server when a survey is created
 * @param {Survey} survey The survey to display
 */
connection.on("OnNewSurvey", (survey:Survey) => {
    //Add survey to list
    surveysToVote.value.push(survey);
    //TODO: Add survey to UI
});

/**
 * Will be called by the server when a survey is closed
 * @param {string} surveyId ID of the survey
 */
connection.on("OnSurveyClose", (surveyId:string) => {
    //Find and close survey
    //check if survey is in surveysToVote, if so remove and add to surveys. Else just close survey
    // @ts-ignore
    const survey = surveysToVote.value.find(survey => survey.id === surveyId);
    if (survey != undefined) {
        // @ts-ignore
        delete surveysToVote.value[surveysToVote.value.indexOf(survey)];
        surveys.value.push(survey);
    }
    // @ts-ignore
    surveys.value.find(survey => survey.id === surveyId).isClosed = true;
});

/**
 * Will be called by the server when a survey is deleted
 * @param {string} surveyId The ID of the survey to delete
 */
connection.on("OnSurveyRemove", (surveyId:string) => {
    //Find and remove survey in both lists, if it exists
    //FIXME: This is not working
    // @ts-ignore
    delete surveysToVote.value[surveysToVote.value.indexOf(surveysToVote.value.find(survey => survey.id === surveyId))];
    // @ts-ignore
    delete surveys.value[surveys.value.indexOf(surveys.value.find(survey => survey.id === surveyId))];
});

//</editor-fold>

//<editor-fold desc="Room">

/**
 * Will be called by the server when a room has been destroyed
 */
connection.on("OnRoomDestroy", () => {
    //Quit connection and leave page
});

//</editor-fold>

//TODO: Region Other

//</editor-fold>

//<editor-fold desc="Server">

//<editor-fold desc="Question">

/**
 * Ask a question
 * @param {Question} question the question to ask
 */
export function AskQuestion(question:string) {
    try {
        connection.invoke("AskQuestion", question);
    } catch (err) {
        console.error(err);
    }
}

//</editor-fold>

//<editor-fold desc="Survey">

/**
 * Vote for an answer
 * @param {string} surveyId ID of the survey
 * @param {string} answerId ID of the answer
 * @returns {Survey} The survey with the answers visible
 */
export async function Vote(surveyId:string, answerId:string) {
    try {
        //Find old survey and remove it
        // @ts-ignore
        delete surveysToVote.value[surveysToVote.value.indexOf(surveysToVote.value.find(survey => survey.id === surveyId))];

        //Replace with new one
        const survey = await connection.invoke("Vote", surveyId, answerId);
        surveys.value.push(survey)

    } catch (err) {
        console.error(err);
    }
}

/**
 * Dismiss an survey
 * @param {string} surveyId ID of the survey
 * @returns {Survey} The survey with the answers visible
 */
export async function Dismiss(surveyId:string) {
    try {
        //Find old survey and remove it
        // @ts-ignore
        delete surveysToVote.value[surveysToVote.value.indexOf(surveysToVote.value.find(survey => survey.id === surveyId))];

        //Replace with new one
        const survey = await connection.invoke("Dismiss", surveyId);
        surveys.value.push(survey)

    } catch (err) {
        console.error(err);
    }
}

//</editor-fold>

//<editor-fold desc="Room">

/**
 * Join a room
 * @param {string} roomId ID of the room to join
 */
function JoinRoom(roomId:string) {
    try {
        connection.invoke("JoinRoom", roomId);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Leave a room
 * Leave page
 */
function LeaveRoom() {
    try {
        connection.invoke("LeaveRoom");
        //TODO: Leave page
        //TODO: Remove localStorage
    } catch (err) {
        console.error(err);
    }
}
//</editor-fold>

//</editor-fold>

//</editor-fold>

//<editor-fold desc="Helper">
function convertToBoolean(input: string|null): boolean | undefined {
    if (input === null) {
        return undefined;
    }
    try {
        return JSON.parse(input.toLowerCase());
    }
    catch (e) {
        return undefined;
    }
}
//</editor-fold>
