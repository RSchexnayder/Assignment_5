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


function init(){
let responses = [document.querySelector("input[name=pilotName"), document.querySelector("input[name=copilotName"), document.querySelector("input[name=fuelLevel"), document.querySelector("input[name=cargoWeight")  ];
let formSubmit= document.getElementById("formSubmit")
let formData = new FormData(document.querySelector("form"));
let stringChecker = function(value){
   return isNaN(value);
}
let numberChecker = function(value){
   let numVal = Number(value);
   return !(isNaN(numVal));
}
let errorVisible = function(){
   document.getElementById("faultyItems").style.visibility = "visible";
}
errorVisible()

let updatePilotInfo = function(){
   document.getElementById("pilotStatus").innerHTML = (`Pilot ${document.querySelector("input[name=pilotName").value} is ready for launch`)
   document.getElementById("copilotStatus").innerHTML = (`Co-Pilot ${document.querySelector("input[name=copilotName").value} is ready for launch`)
   window.alert("we got here")
}

let inputChecker = function(){
   let invalidResponseCounter = 0;
   for(let i = 0; i < responses.length; i++){
      let currentResponse = responses[i].value;
      if (currentResponse === ""){
         invalidResponseCounter += 1;
    } else if (i === 0 || i === 1){
         if (stringChecker(currentResponse)=== true){
         // valid response
            }else {
               invalidResponseCounter += 1;
      }
   }  else if (i === 2 || i === 3){
         if (numberChecker(currentResponse) === true){
         // valid response
            }else { 
               invalidResponseCounter += 1;
      }
    }
   }
   if (invalidResponseCounter !== 0){
      event.preventDefault();
      window.alert("All fields are required")
  }
  updatePilotInfo()
 }

formSubmit.addEventListener("click", inputChecker);
}
window.onload = init;

