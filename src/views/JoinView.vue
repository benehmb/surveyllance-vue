<template>
  <div class="wrapper">
    <!-- Head with title and create- / join-buttons -->
    <div class="container">
      <h1>Welcome to <b>SURVEY</b>llance!</h1>
      <h3>Join room by entering Room-Code below:</h3>
      <form>
        <div>
          <v-text-field id="joinId" type="text" label="Join-ID" v-model="joinId"/>
        </div>
      </form>
      <!--TODO: Use form submit, because pressing 'ENTER' reloads page without arguments-->
      <v-btn @click="joinRoom">Join room</v-btn>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout"> {{ text }}
      <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <ul class="bg-bubbles">
      <li v-for="n in 10" v-bind:key="n"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "JoinView",
  data () {
    return {
      joinId: this.$route.params.id,
      snackbar: false,
      text: `Error!`,
      timeout: 2000,
    }
  },
  methods: {
    joinRoom() {
      console.log("Joining room with id: " + this.joinId);
      const vueData = this;
      const joinId = this.joinId;
      //Create promise for the ajax request
      var promise = new Promise((resolve, reject) => {
        //Initialize the ajax request
        var roomRequest = new XMLHttpRequest();

        //Set the request method and url
        //TODO: Use code below, when backend is ready
        //roomRequest.open("GET",  window.location.origin + "/rooms/"+this.joinId, true);
        roomRequest.open("GET",  "https://localhost:5001/rooms/"+joinId, true);

        //Handle the response
        roomRequest.onload = () =>{
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

      //When promise comes back, check results
      promise.then(
          //If promise resolves, check result
          function(result) {
            if(result) {
              vueData.showSnackbar(`Room found. Redirecting...`);
              // Check browser support
              if (typeof(Storage) !== "undefined") {
                //Setting up the localStorage
                sessionStorage.clear();
                sessionStorage.setItem("type", false);
                sessionStorage.setItem("joinId", joinId);
                vueData.$router.push({name: 'participant'});
              } else {
                alert("Sorry, your browser does not support Web Storage...");
              }
            }else {
              //Notify user, if room does not exist
              vueData.showSnackbar(`No room with this ID was found`);
            }
          },
          //If promise rejects, show error
          function (error) {
            alert(error);
            throw error;
          }
      );
    },
    showSnackbar(text) {
      this.text = text;
      this.snackbar = true;
    }
  }
}
</script>

<style src="../assets/styles/welcome_and_join.css" scoped>

</style>