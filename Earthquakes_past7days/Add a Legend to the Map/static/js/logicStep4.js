// Module 13.6.4: Add Earthquake Data as an Overlay
// https://courses.bootcampspot.com/courses/1225/pages/13-dot-6-4-add-earthquake-data-as-an-overlay?module_item_id=499249

// Add console.log to check to see if our code is working. (Optional.)
console.log("working"); // The console.log() function with the phrase "working" inside the parentheses will help us confirm that this logic.js file is being accessed in the console on Chrome.

// ________________________________________________________________________________________________________________________
//
// Add the tile layers (streets/satellite--total of 2)
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

// Create a base layer that holds both maps.
//      (Hold both map variables--streets and dark--to a nwe variable [baseMapp]; this variable
//      will be used as the base layer, which will later be referenced when creating the Layers Control below.)
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// (In the base layer code, the Steet and Dark keys set the text, which is seen when opening the index.html file;
// the corresponding values reference the tile layer; Street and Dark can be used to toggle between styles
// seen when opening the index.html file.)
//________________________________________________________________________________________________________________________

// Create the map object with center, zoom level and default layer. 
//      (This is an alternative to the setView() method, 
//      where each attribute in the map is modified using the curly braces notation.)
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Create the earthquake layer for the map.
let earthquakes = new L.layerGroup();

// Define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);
// ________________________________________________________________________________________________________________________

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {

// ________________________________________________________________________________________________________________________

// This function returns the style data for each of the earthquakes we plot on
// the map. Pass the magnitude of the earthquake into a function to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
         return 1;
    }
        return magnitude * 4;
}

// ________________________________________________________________________________________________________________________

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // Set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
    // Create a popup for each circleMarker to display the magnitude and
    // location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(earthquakes);

earthquakes.addto(map);
});