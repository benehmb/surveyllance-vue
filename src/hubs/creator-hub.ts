import {Survey} from "@/objects/Survey";
import {HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {Ref, ref, UnwrapRef} from "vue";
import survey from "@/components/Survey.vue";

let joinId : string|null;

//<editor-fold desc="sessionStorageValues">
if (typeof(Storage) !== "undefined") {
    //Get value from localStorage (See readme.md for more details what to save in the localStorage)
    const type : boolean|undefined = convertToBoolean(sessionStorage.getItem("type"));
    joinId = sessionStorage.getItem("joinId");

    //Check if type is set to "participant"
    if (type === true){
        //TODO: Show error message (Via toast?) 'You are not a creator. Join a room or restart your Browser!'
        throw new Error("Not a creator");
    }
} else {
    alert("Sorry, your browser does not support Web Storage...");
    throw new Error("No browser-support for Web Storage");
}
//</editor-fold>

// <editor-fold desc="Websocket-Connection">
// Connect to Websocket
const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/creator")
    .configureLogging(LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");

        //Get value from localStorage (See readme.md for more details what to save in the localStorage)
        const type : boolean|undefined = convertToBoolean(sessionStorage.getItem("type"));
        joinId = sessionStorage.getItem("joinId");

        //Check if type and joinId are set
        if ((type === null || type === undefined) || (joinId === null || joinId === undefined)) {
            //If not, create a new room
            //TODO: Show message (Via toast?) 'Creating new room...'
            joinId = await CreateRoom();
        } else {
            //If yes, join the room
            //Check if type is set to "creator"
            if (type !== true){
                //TODO: Show message (Via toast?) 'You are not a creator. Join a room or restart your Browser!'
                throw new Error("Not a creator");
            }

            //TODO: Show message (Via toast?) 'You have already created a room. Trying to reconnect...'

            CheckRoom(joinId).then(
                //If promise resolves, check result
                async function(result) {
                    if(result) {
                        //TODO: Show message (Via toast?) 'Room found. Joining...'
                        if (joinId === null) throw new Error("No joinId defined");
                        JoinRoom(joinId);
                    }else {
                        //TODO: Show message (Via toast?) 'No room with this ID was found. Creating a new one...'
                        joinId = await CreateRoom();
                    }
                },
                //If promise rejects, show error
                function (error) {
                    alert(error);
                    throw error;
                }
            );
            //Setting up the localStorage
            sessionStorage.clear();
            sessionStorage.setItem("type", String(true));
            sessionStorage.setItem("joinId", joinId);
            //TODO: Insert token here
        }

        console.log("New SURVEYllance-Session with JoinId: " + joinId);
        if (joinId === null)
            throw new Error("JoinId is null");
        console.log("Go to '" + window.location.origin + "/join/" + encodeURIComponent(joinId) + "' to join it");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

// Start the connection.
start();

/**
 * Check if a room exists
 * @param joinId Id of the room
 * @return {Promise<unknown>} the promise
 * @constructor
 */
function CheckRoom(joinId:string){

    //Create promise for the ajax request
    const promise = new Promise((resolve, reject) => {
        //Initialize the ajax request
        const roomRequest = new XMLHttpRequest();

        //Set the request method and url
        roomRequest.open("GET", window.location.origin + "/rooms/" + joinId, true);

        //Handle the response
        roomRequest.onload = () => {
            if (roomRequest.status === 200) {
                resolve(true);
            } else if (roomRequest.status === 404) {
                resolve(false);
            } else {
                reject(Error(roomRequest.statusText));
            }
        };

        //Handle errors
        roomRequest.onerror = () => {
            reject(Error("Network Error"));
        };

        //Send the request
        roomRequest.send();
    });

    //Return the promise
    return promise;

}

// </editor-fold>

const surveyContainer = document.getElementById('surveys');
export const surveys : Ref<UnwrapRef<Survey[]>> = ref([]);

const questionContainer = document.getElementById('questions');

//<editor-fold desc="API-Methods">

//<editor-fold desc="Client">

//<editor-fold desc="Question">

/**
 * Will be called by the server when a new question is created
 * @param {Question} question
 */
connection.on("OnNewQuestion", (question) => {
    //TODO: Display question
});

//</editor-fold>

//<editor-fold desc="Survey">
/**
 * Will be called by the server when the results of a survey change
 * @param {string} surveyId ID of the survey
 * @param {SurveyAnswer} answer the answer, which has changed
 */
connection.on("OnNewSurveyResult", (surveyId, answer) => {
    // @ts-ignore
    surveys.value.find(survey => survey.id === surveyId).OnNewSurveyResult(answer);
});

/**
 * Will be called by the server when a survey is created
 * Only used on @see JoinRoom
 * @param {Survey} survey The survey to display
 */
connection.on("OnNewSurvey", (survey) => {
    surveys.value.push(survey);
    //TODO: Display survey
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
 * Remove a question
 * @param {string} questionId ID of the question to remove
 */
function RemoveQuestion(questionId:string) {
    try {
        connection.invoke("RemoveQuestion", questionId);
    } catch (err) {
        console.error(err);
    }
}
//</editor-fold>

//<editor-fold desc="Survey">
/**
 * Create a new survey
 * @param {Survey} survey The survey to create
 */
export async function NewSurvey(survey:Survey){
    try {
        const generatedSurvey = await connection.invoke("NewSurvey", survey);
        surveys.value.push(generatedSurvey);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Close a survey, so no more votes can be added
 * @param {string} surveyId ID of the survey to close
 */
function CloseSurvey(surveyId:string) {
    try {
        connection.invoke("CloseSurvey", surveyId);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Remove a survey
 * @param {string} surveyId ID of the survey to remove
 * @constructor
 */
function RemoveSurvey(surveyId:string) {
    try {
        surveys.value.forEach(survey => {
            if (survey.id === surveyId) {
                surveys.value.splice(surveys.value.indexOf(survey), 1);
            }
        });
        connection.invoke("RemoveSurvey", surveyId);
    } catch (err) {
        console.error(err);
    }
}
//</editor-fold>

//<editor-fold desc="Room">
/**
 * Create a new room
 * @return {string} ID of the room
 */
async function CreateRoom() {
    try {
        return await connection.invoke("CreateRoom");
    } catch (err) {
        console.error(err);
    }
}

/**
 * Join a room
 * @param {string} roomId ID of the room to join
 */
async function JoinRoom(roomId:string) {
    try {
        await connection.invoke("JoinRoom", roomId);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Destroy a room
 * Leave page
 */
function DestroyRoom() {
    try {
        connection.invoke("DestroyRoom");
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
