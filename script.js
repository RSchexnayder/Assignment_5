// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


function init() {
   let responses = [document.querySelector("input[name=pilotName"), document.querySelector("input[name=copilotName"), document.querySelector("input[name=fuelLevel"), document.querySelector("input[name=cargoWeight")];
   let formSubmit = document.getElementById("formSubmit")
   let formData = new FormData(document.querySelector("form"));
   let stringChecker = function (value) {
      return isNaN(value);
   }
   let numberChecker = function (value) {
      let numVal = Number(value);
      return !(isNaN(numVal));
   }
   let errorVisible = function () {
      document.getElementById("faultyItems").style.visibility = "visible";
   }

   let updatePilotInfo = function () {
      document.getElementById("pilotStatus").innerHTML = (`Pilot ${document.querySelector("input[name=pilotName").value} is ready for launch`)
      document.getElementById("copilotStatus").innerHTML = (`Co-Pilot ${document.querySelector("input[name=copilotName").value} is ready for launch`)
   }
   let doNotLaunch = function () {
      document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch"
      document.getElementById("launchStatus").style.color = "red";
   }

   let notEnoughFuel = function () {
      errorVisible()
      doNotLaunch()
      document.getElementById("fuelStatus").innerHTML = "Fuel level is too low for launch."

   }

   let tooMuchWeight = function () {
      errorVisible()
      doNotLaunch()
      document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch."
   }

   let readyForTakeoff = function () {
      document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch"
      document.getElementById("launchStatus").style.color = "green";
   }

   let randomDestination = function(){
      return (Math.floor(Math.random()* 6));

   }
   let inputChecker = function () {
      let invalidResponseCounter = 0;
      for (let i = 0; i < responses.length; i++) {
         let currentResponse = responses[i].value;
         if (currentResponse === "") {
            window.alert("All fields are required")
         } else if (i === 0 || i === 1) {
            if (stringChecker(currentResponse) === true) {
               // valid response
            } else {
               invalidResponseCounter += 1;
            }
         } else if (i === 2 || i === 3) {
            if (numberChecker(currentResponse) === true) {
               if (i === 2) {
                  if (currentResponse < 10000) {
                     notEnoughFuel()
                  }
               } else if (i === 3) {
                  if (currentResponse > 10000) {
                     tooMuchWeight();
                  }
               }
            } else {
               invalidResponseCounter += 1;
            }
         }
      }
      if (invalidResponseCounter !== 0) {
         event.preventDefault();
         window.alert("Make sure to enter valid information for each field!")
      }
      event.preventDefault();
      readyForTakeoff()
      updatePilotInfo()
   }

   formSubmit.addEventListener("click", inputChecker);
   

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      return response.json();}).then(function (json) {
      console.log(json);
      let destination = randomDestination();
       document.getElementById("missionTarget").innerHTML =  (`<h2>Mission Destination</h2>
       <ol>
          <li>Name: ${json[destination].name}</li>
          <li>Diameter: ${json[destination].diameter}</li>
          <li>Star: ${json[destination].star}</li>
          <li>Distance from Earth: ${json[destination].distance}</li>
          <li>Number of Moons: ${json[destination].moons}</li>
       </ol>
       <img src="${json[destination].image}">`)
      });

}
window.onload = init;

