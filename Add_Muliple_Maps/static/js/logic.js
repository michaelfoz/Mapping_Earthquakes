// Module 13.5.4: Add Multiple Maps
// https://courses.bootcampspot.com/courses/1225/pages/13-dot-5-4-add-multiple-maps?module_item_id=499206

/* Preface:

    "To create two map choices, we'll edit the logic.js file for mapping the major airports 
    without the popup markers. We'll move some code to make it more readable, 
    and we'll add more code to the logic.js file.

    To add another map, we'll use the Leaflet Layers Control (see the documentation (https://leafletjs.com/examples/layers-control/)). 
    The Layers Control allows us to control which layers, or styles, 
    we'll see on our map. For this task, we'll work with the streets and dark layers."

*/

// Add console.log to check to see if our code is working. (Optional.)
console.log("working"); // The console.log() function with the phrase "working" inside the parentheses will help us confirm that this logic.js file is being accessed in the console on Chrome.

// ________________________________________________________________________________________________________________________
//
// (1) Add the tile layers.
//
// Create the street view tile layer that will be the default background of the map:
// (The tile layer is used to load and display a tile layer on the map.)
//      (We have two options to create a tile layer: (1) Use the Leaflet Documentation |or| (2) Use the Mapbox Styles API) 
//
// (Use the Mapbox Styles API to add a map tile layer that will be the background of the map.)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map:
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
//________________________________________________________________________________________________________________________

// (2) Create a base layer that holds both maps.
//      (Hold both map variables--streets and dark--to a nwe variable [baseMapp]; this variable
//      will be used as the base layer, which will later be referenced when creating the Layers Control below.)
let baseMaps = {
    Street: streets,
    Dark: dark
};
// (In the base layer code, the Steet and Dark keys set the text, which is seen when opening the index.html file;
// the corresponding values reference the tile layer; Street and Dark can be used to toggle between styles
// seen when opening the index.html file.)

// (3) Create the map object with center, zoom level and default layer. 
//      (This is an alternative to the setView() method, 
//      where each attribute in the map is modified using the curly braces notation.)
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// (4) Finally, we add the tile layers to the map:
//     (To complete the code for the map layers, use the Leaflet control.layers,
//     which will control the layers we'll see on the map.)
L.control.layers(baseMaps).addTo(map);
// When creating the Layers Control, the argument is passed, baseMaps, is the base layer of the object,
// which will allow the two different map styles to be shown when opening the index.html file.

// ________________________________________________________________________________________________________________________

// (5) Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/michaelfoz/Mapping_Earthquakes/main/majorAirports.json"

// (6) Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});