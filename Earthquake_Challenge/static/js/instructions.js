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