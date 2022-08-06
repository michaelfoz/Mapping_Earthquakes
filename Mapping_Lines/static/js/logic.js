
// Add console.log to check to see if our code is working.
console.log("working"); // The console.log() function with the phrase "working" inside the parentheses will help us confirm that this logic.js file is being accessed in the console on Chrome.

/* Create a Map Object with obtions.
   Create the map object with a center and zoom level.
      (1) Assign the variable map to the object L.map()--->and instnatiate the object 
          with the given string 'mapid'.
      (2) 'mapid' willl reference the 'id' tag in the <div> element on the index.html file.
      (3) The setView() method sets the view of the map with a geographical center
          (where the first coordinate is latitude (37.6213)
          and the second coordinate is longitutde (-122.3790))
          Also, the zoom level is set to "5" (on a scale of 0-18). */
          let map = L.map('mapid').setView([37.6213, -122.3790], 5);


// Self-note: When creating a line in Leaflet, the starting and ending points 
// and all coordinates along the route need to be in an array. 
// (Assign the array to the line variable like this):
// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085], // LAX
    [37.6213, -122.3790], // SFO
    [40.7899, -111.9791], // SLC
    [47.4502, -122.3088] // SEA
  ];

// Create a line on a map using the Leaflet polyline() function.
// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "yellow"
  }).addTo(map);

// Add the map tile layer method that will be the background of the map 
// (The tile layer is used to load and display a tile layer on the map.)
//      (We have two options to create a tile layer: (1) Use the Leaflet Documentation |or| (2) Use the Mapbox Styles API) 
//
// (Use the Mapbox Styles API to add a map tile layer that will be the background of the map.)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);