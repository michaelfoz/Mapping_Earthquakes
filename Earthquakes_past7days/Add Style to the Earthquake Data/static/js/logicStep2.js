// Module 13.6.2: Add Style to the Earthquake Data
// https://courses.bootcampspot.com/courses/1225/pages/13-dot-6-2-add-style-to-the-earthquake-data?module_item_id=499238

// Add console.log to check to see if our code is working. (Optional.)
console.log("working"); // The console.log() function with the phrase "working" inside the parentheses will help us confirm that this logic.js file is being accessed in the console on Chrome.

// ________________________________________________________________________________________________________________________
//
// (1) Add the tile layers (streets/dark/light/satellite--total of 4)
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

// Create the satellite streets view tile layer that will be an option for our map:
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
//________________________________________________________________________________________________________________________

// (2) Create a base layer that holds both maps.
//      (Hold both map variables--streets and dark--to a nwe variable [baseMapp]; this variable
//      will be used as the base layer, which will later be referenced when creating the Layers Control below.)
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// (In the base layer code, the Steet and Dark keys set the text, which is seen when opening the index.html file;
// the corresponding values reference the tile layer; Street and Dark can be used to toggle between styles
// seen when opening the index.html file.)

// (3) Create the map object with center, zoom level and default layer. 
//      (This is an alternative to the setView() method, 
//      where each attribute in the map is modified using the curly braces notation.)
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// (4) Finally, we add the tile layers to the map:
//     (To complete the code for the map layers, use the Leaflet control.layers,
//     which will control the layers we'll see on the map.)
L.control.layers(baseMaps).addTo(map);
// When creating the Layers Control, the argument is passed, baseMaps, is the base layer of the object,
// which will allow the two different map styles to be shown when opening the index.html file.

// ________________________________________________________________________________________________________________________

// (5) Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(),
        stroke: true,
        weight: 0.5
        };
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
         return 1;
        }
        return magnitude * 4;
    }

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
            },
          // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo
    }).addTo(map);
});

