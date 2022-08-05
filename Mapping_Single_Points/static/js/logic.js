/* 
    This file (logic.js) created per Module 13.2.4: Create a Simple Map
        Link: https://courses.bootcampspot.com/courses/1225/pages/13-dot-2-4-create-a-simple-map?module_item_id=499125
*/



/* Add some boilerplate code.
(Most of this code can ber reused for many of the maps created later in the module.)
*/

// (1st code added to this file): Add console.log to check to see if our code is working.
console.log("working"); // The console.log() function with the phrase "working" inside the parentheses will help us confirm that this logic.js file is being accessed in the console on Chrome.


//(2nd code added):
/* Create a Map Object with obtions.
   Create the map object with a center and zoom level.
      (1) Assign the variable map to the object L.map()--->and instnatiate the object 
          with the given string 'mapid'.
      (2) 'mapid' willl reference the 'id' tag in the <div> element on the index.html file.
      (3) The setView() method sets the view of the map with a geographical center
          (where the first coordinate is latitude (40.7)
          and the second coordinate is longitutde (-94.5)).
          Also, the zoom level is set to "4" (on a scale of 0-18). */
let map = L.map('mapid').setView([40.7, -94.5], 4);

    /* For future reference: an alternative to the setview() method = modify each attribute in the map object using curly braces notation.

            // Create the map object with a center and zoom level.
            let map = L.map("mapid", {
                center: [
                    40.7, -94.5
                ],
            zoom: 4
            });

        (This method is useful when there is a need to add multiple tile layers, 
        or a background image of our map(s)--->will be later in this module.)
  
    */

// ________________________________________________________________________________________________________________________________________________
// [Self-note: 4th code added commented out; changed the marker shape from a point to a dot (circle); refer to "5th code added"]
// (4th code added):
//  Add a marker to the map for Los Angeles, California.
//      (Instructions to put this code before the tileLayer() code.)
//      Module 13.4.1: Map a Single Point (https://courses.bootcampspot.com/courses/1225/pages/13-dot-4-1-map-a-single-point?module_item_id=499165)
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// ________________________________________________________________________________________________________________________________________________

// ________________________________________________________________________________________________________________________________________________
// [Self-note: 5th code added commented out; changed to code to use a circleMarker() function instead ; refer to "6th code added"]
// (5th code added): 
// Add a [circle] marker to the map for Los Angeles, California.
// L.circle([34.0522, -118.2437], {
//     radius: 100
// }).addTo(map);
// ________________________________________________________________________________________________________________________________________________

// (6th code added): 
// Add a circle to the map
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: 'ffffa1'
}).addTo(map);

// (3rd code added):
// Add the map tile layer method that will be the background of the map 
// (The tile layer is used to load and display a tile layer on the map.)
//      (We have two options to create a tile layer: (1) Use the Leaflet Documentation |or| (2) Use the Mapbox Styles API) 
//
// (Use the Mapbox Styles API to add a map tile layer that will be the background of the map.)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);