// Module 13.5.2: Map GeoJSON Point Types
// https://courses.bootcampspot.com/courses/1225/pages/13-dot-5-2-map-geojson-point-type?module_item_id=499195


// Add console.log to check to see if our code is working.
console.log("working"); // The console.log() function with the phrase "working" inside the parentheses will help us confirm that this logic.js file is being accessed in the console on Chrome.

/* Create a Map Object with obtions.
   Create the map object with a center and zoom level.
      (1) Assign the variable map to the object L.map()--->and instnatiate the object 
          with the given string 'mapid'.
      (2) 'mapid' willl reference the 'id' tag in the <div> element on the index.html file.
      (3) The setView() method sets the view of the map with a geographical center
          (where the first coordinate is latitude (37.5)
          and the second coordinate is longitutde (-122.5))
          Also, the zoom level is set to "10" (on a scale of 0-18). */
let map = L.map('mapid').setView([37.5, -122.5], 10); // Mab object with center at SFO


// Add a single point on the map using GeoJSON data (featureCollection object).
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

/*
// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  // Turn each feature (from the featureCollection object above) into a marker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    // Let's add the city to the popup marker using Leaflet .bindPopup() method:
    .bindPopup("<h2>" + feature.properties.city + "</h2>");
  }

}).addTo(map);
*/

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  // Add a popup marker using the onEachFeature function.
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup();
   }
});

// Add the map tile layer method that will be the background of the map.
// (The tile layer is used to load and display a tile layer on the map.)
//      (We have two options to create a tile layer: (1) Use the Leaflet Documentation |or| (2) Use the Mapbox Styles API) 
//
// (Use the Mapbox Styles API to add a map tile layer that will be the background of the map.)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our tile layer to the map.
streets.addTo(map);






