/*
Module 13 Challenge:

Self-note: original downloaded file name was tectonic_plate_starter_logic.js;
           per Deliverable 1 instructions, rename file to challenge.logic.js.

Self-note: this line of code has to be in the index.html file now that
  the file is renamed.

      Inside index.html:
          <script type="text/javascript" src="static/js/challenge_logic.js"></script>

Self-note: major_eq_starter_logic.js instructions applied to this challenge_logic.js file per
          Deliverable 2 instructions.

Leaflet Quick Start Guide Link: https://leafletjs.com/examples/quick-start/
*/

/*________________________________________________________________________________________________________________________*/
// Add console.log to check to see if our code is working.

console.log("working");

/*________________________________________________________________________________________________________________________*/

// Create Tile Layers, Map Object and Base Layer that holds 3 maps

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// (Deliverable 3 Step 1): Add a third map style as a tile layer object.
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Outdoors": outdoors // (Deliverable 3 Step 2--Add the map variable to the base layer object.)
};
/*________________________________________________________________________________________________________________________*/

// Layer Groups

// 1. Add a 3rd layer group for the major earthquake data.
let allEarthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup(); // (Deliverable 1 Step 4--add a 2nd layer group variable for the tectonic plate data.)
let majorEarthquakes = new L.LayerGroup(); // (Deliverable 2 Step 1--add a third layer group variable for the major earthquake data.)

// 2. Add a reference to the major earthquake group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Major Earthquakes": majorEarthquakes, // (Deliverable 1 step 5--add a reference to the tectonic plate data to the overlay object.)
  "Tectonic Plates": tectonicPlates // (Deliverable 2 step 2--add a reference to the major earthquake data to the overlay object.)
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

/*________________________________________________________________________________________________________________________*/

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
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

  // This function determines the color of the marker based on the magnitude of the earthquake.
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
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

  /*
  (Deliverable 2 Step 3): use the d3.json() callback method to make a call to the major earthquake data from the GeoJSON 
        Summary Feed for M4.5+ Earthquakes for the Past 7 Days.
        (M4.5+ Earthquakes for the Past 7 Days: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)
  */
// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {

  /* 
  (Deliverable 2 Step 4): use the same parameters in the styleInfo() function that will
      make a call to the getColor() and getRadius() functions.
  */
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
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

/*
(Deliverable 2 Step 5): change the getColor() function to use only three colors for the following magnitudes; 
        magnitude less than 5, a magnitude greater than 5, and a magnitude greater than 6.
*/
// This function determines the color of the marker based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 6) {
    return "#ea2c2c";
  }
  if (magnitude > 5) {
    return "#ea822c";
  }
  return "#eecc00";
}

// (Deliverable 2 Step 6): use the same parameters from the preceding step in the getRadius() function.
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

/*
(Deliverable 2 Step 7):
        Pass the major earthquake data into the GeoJSON layer and do the following 
        with the geoJSON() layer:
        [x] Turn each feature into a circleMarker on the map
        [x] Style each circle with styleInfo() function
        [x] Create a popup for the circle to display the magnitude and location of the earthquake
        [x] Add the major earthquake layer group variable you created in Step 1 to the map, i.e., 
            .addTo(majorEQ) and then close the geoJSON() layer.

            (Self-note: variable created in Step 1 = majorEarthquakes)

*/
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
  // We create a popup for each circleMarker to display the magnitude and location of the earthquake
  // after the marker has been created and styled.
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(majorEarthquakes); // Add the major earthquake layer group variable to the map

/* 
(Deliverable 2 Step 8): add the major earthquake layer group variable to the map, i.e, majorEQ.addTo(map), 
    and then close the d3.json() callback.
*/
// Add the major earthquake layer group variable to the map...
majorEarthquakes.addTo(map);
}); // ...and then close the d3.json() callback.

/*________________________________________________________________________________________________________________________*/

// Here we create a legend control object.
let legend = L.control({
  position: "bottomright"

});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  // Then add all the details for the legend
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);

  /* 
  (Deliverable 1 Step 6): using d3.json() callback method, make a call to the tectonic plate data 
      using the GeoJSON/PB2002_boundaries.json data from this GitHub repository
      (https://github.com/fraxen/tectonicplates) 
  */
  // Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(tectonicplatedata) {
    
    /* 
    (Deliverable 1 Step 7):
    Inside the d3.json() method do the following:
        [x] Pass the tectonic plate data to the geoJSON() layer.
        [x] Style the lines with a color and weight that will make it stand out on all maps.
        [x] Add the tectonic layer group variable you created in Step 1 to the map, i.e., .addTo(tectonicPlates) and close the geoJSON() layer.
        [x] Next, add the tectonic layer group variable to the map, i.e, tectonicPlates.addTo(map).
        [x] Finally, close the d3.json() callback.
    */
    L.geoJson(tectonicplatedata, {  // Pass tectonic plate data to geoJSON() layer.
        // Style the lines with a color and weight...
         color: "#EA3680", // (Hot pink color)
         weight: 4
       }).addTo(tectonicPlates); // Add the tectonic layer group variable (tectonicPlates) to the map and close the geoJSON() layer.

      // Add the tectonicPlates layer group to the map.
      tectonicPlates.addTo(map);
    }); // Close d3.json() callback
});
/*________________________________________________________________________________________________________________________*/



/*
Module 13 Challenge Instructions

Download 2 files:
[] Download the tectonic plate starter code
   (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-online/module_13/tectonic_plate_starter_logic.js)

[x] Download the major earthquake chart starter code
   (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-online/module_13/major_eq_starter_logic.js)

________________________________________________________________________________________________________________________

Deliverable 1: Add Tectonic Plate Data (35 points)
Using your knowledge of JavaScript, Leaflet.js, and geoJSON data, 
you’ll add tectonic plate data using d3.json(), 
add the data using the geoJSON() layer, 
set the tectonic plate LineString data to stand out on the map, 
and add the tectonic plate data to the overlay object with the earthquake data.

[x] 1. Create a new folder on your Mapping_Earthquakes repository and name it "Earthquake_Challenge."
[x] 2. Copy the folders and files from your Earthquakes_past7days branch and add them to the Earthquake_Challenge folder. 
      The folder should have this structure:

        index.html
        static (folder)
            css (folder)
                style.css
            js (folder)
                config.js
        logic.js


[x] 3. Download the tectonic_plate_starter_logic.js file, add it to your js folder, and rename it challenge_logic.js.
[x] 4. In Step 1, add a second layer group variable for the tectonic plate data. 
[x] 5. In Step 2, add a reference to the tectonic plate data to the overlay object.
[x] 6. In Step 3, using d3.json() callback method, 
        make a call to the tectonic plate data using the GeoJSON/PB2002_boundaries.json data 
        from this GitHub repository 
        (https://github.com/fraxen/tectonicplates) 
        for the tectonic plate data. 
        You’ll need to log into GitHub to access the GeoJSON data.
[x] 7. Inside the d3.json() method do the following:
        [x] Pass the tectonic plate data to the geoJSON() layer.
        [x] Style the lines with a color and weight that will make it stand out on all maps.
        [x] Add the tectonic layer group variable you created in Step 1 to the map, i.e., .addTo(tectonicPlates) and close the geoJSON() layer.
        [x] Next, add the tectonic layer group variable to the map, i.e, tectonicPlates.addTo(map).
        [x] Finally, close the d3.json() callback.
[x] 8. Start your Python server and launch the index.html file and confirm that your map with the earthquake and tectonic plate data is similar to the image.
        (image link: https://courses.bootcampspot.com/courses/1225/files/1403010/preview)
________________________________________________________________________________________________________________________
Deliverable 2: Add Major Earthquake Data (50 points)
Using your knowledge of JavaScript, Leaflet.js, and geoJSON data, 
you’ll add major earthquake data to the map using d3.json(). 
You'll also add color and set the radius of the circle markers based on the magnitude of earthquake, 
and add a popup marker for each earthquake that displays the magnitude and location of the earthquake 
using the GeoJSON layer, geoJSON().

[x] Download the major_eq_starter_logic.js file and add it to your js folder. 
Look over the starter code and use it as a template to modify your challenge_logic.js file 
that you used to add the tectonic plate data in Deliverable 1.

Follow the instructions below that refer to the steps in the major_eq_starter_logic.js file 
and make the changes to your challenge_logic.js file to complete Deliverable 2.
[x] 1. In Step 1, add a third layer group variable for the major earthquake data.
[x] 2. In Step 2, add a reference to the major earthquake data to the overlay object.
[x] 3. In Step 3, use the d3.json() callback method to make a call to the major earthquake data from the GeoJSON 
        Summary Feed for M4.5+ Earthquakes for the Past 7 Days.
        (M4.5+ Earthquakes for the Past 7 Days: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson)
[x] 4. In Step 4, use the same parameters in the styleInfo() function that will 
        make a call to the getColor() and getRadius() functions.
[x] 5. In Step 5, change the getColor() function to use only three colors for the following magnitudes; 
        magnitude less than 5, a magnitude greater than 5, and a magnitude greater than 6.
[x] 6. In Step 6, use the same parameters from the preceding step in the getRadius() function.
[x] 7. In Step 7, pass the major earthquake data into the GeoJSON layer and do the following 
        with the geoJSON() layer:
        [] Turn each feature into a circleMarker on the map
        [] Style each circle with styleInfo() function
        [] Create a popup for the circle to display the magnitude and location of the earthquake
        [] Add the major earthquake layer group variable you created in Step 1 to the map, i.e., 
            .addTo(majorEQ) and then close the geoJSON() layer.
[] 8. Then, add the major earthquake layer group variable to the map, i.e, majorEQ.addTo(map), and then close the d3.json() callback.
[] 9. Start your Python server and launch the index.html file and confirm that your map with the two earthquake data sets and tectonic plate data is similar to the following image.
________________________________________________________________________________________________________________________
Deliverable 3: Add an Additional Map (15 points)
Using your knowledge of JavaScript and Leaflet.js add a third map style to your earthquake map.

[x] 1. Using the options from the Mapbox styles, 
        add a third map style as a tile layer object to the challenge_logic.js file.
        (Mapbox styles link: https://docs.mapbox.com/api/maps/#styles)
[x] 2. Add the map variable to the base layer object.
[x] 3. Start your Python server and launch the index.html file and confirm that your map is similar to the 
        following image, where there are three map styles, 
        and displays the two earthquake data sets and the tectonic plate data.
        (image link: https://courses.bootcampspot.com/courses/1225/files/1403102/preview)

*/