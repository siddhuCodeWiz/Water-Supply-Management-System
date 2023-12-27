var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var streetMap = L.tileLayer.provider('Esri.WorldStreetMap');

// var fs = require('fs');

// Adding the base Maps which we want from the Leaflet-Provider Plugin
var baseMaps ={
  OSM: osmMap,
  'Street Map': streetMap
}


// *************************************************




// Declaring useful variables
var geoServerIPPort = 'localhost:8080';
var geoServerWorkspace = 'siddharth';
var stateLayerName = 'siddharth:main_water_lines_pg';

// Adding a layer from geoserver (Works only if geoserver's application is running in bg)
var mainWaterLineLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/siddharth/wms",
  {
    layers: 'siddharth:Main_Water_Lines_nonpg',
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    tiled: true,
  }
)

var houseConnectsLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/siddharth/wms",
  {
    layers: '	siddharth:House_Connects_nonpg',
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    tiled: true,
  }
)

var waterTanksLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/siddharth/wms",
  {
    layers: '	siddharth:House_Connects_nonpg',
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    tiled: true,
  }
)

// declaring all the layers with names in a object
var overlayMaps = {
  "Main Water Line": mainWaterLineLayer,
  "House Connects" : houseConnectsLayer,

};

// Defining the look of the map and declaring the layers
var map = L.map('map', {
  center: [17.3981383, 78.4890028],
  zoom: 16,
  layers:[osmMap, mainWaterLineLayer, houseConnectsLayer],
})

// Adding the layers to the map
var mapLayer = L.control.layers(baseMaps, overlayMaps).addTo(map);

// Showing a layer by importing the geoJSON file.
// var water_resorces =$.getJSON("./resources/stanford_geojson.json" ,function(data){
//   L.geoJSON(data).addTo(map);
// })

// var water_resorces =$.getJSON("./points.json" ,function(data){
//   L.geoJSON(data).addTo(map);
// })

// $.getJSON('./lines.json', function (data) {
//   L.geoJSON(data, {
//     style: function (feature) {
//       return {
//         color: 'blue',  // Set the line color
//         weight: 2        // Set the line weight
//       };
//     },
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup(feature.properties.name);
//     }
//   }).addTo(map);
// });

// *********************************************************************
// Retrieving points from database and displaying them on map


function displayPointsOnMap(geojsonData) {
  const data = [];
  var formattedFeature;
  console.log(geojsonData);

  geojsonData["pointsData"].forEach(element => {
    // Check if 'element' and 'element.properties' exist before accessing 'name'
    const name = element && element.properties && element.properties.name;
    var supplied = element.properties.supplied

    if(supplied==="yes"){
      formattedFeature = {
        "type": "Feature",
        "geometry": {
          "type": element.type,
          "coordinates": element && element.coordinates
        },
        "properties": {
          "name": name || "DefaultName",
          "icon": L.icon({
            iconUrl: "./blue.png", // Change the path to your custom icon image
            iconSize: [52, 52], // Set the size of your icon
            iconAnchor: [16, 16], // Set the anchor point of your icon
          }),
          "supplied": element.properties.supplied,
        }
      };
    }

    else{
      formattedFeature = {
        "type": "Feature",
        "geometry": {
          "type": element.type,
          "coordinates": element && element.coordinates
        },
        "properties": {
          "name": name || "DefaultName",
          "icon": L.icon({
            iconUrl: "./red.png", // Change the path to your custom icon image
            iconSize: [52, 52], // Set the size of your icon
            iconAnchor: [16, 16], // Set the anchor point of your icon
          }),
          "supplied": element.properties.supplied,
        }
      };
    }
    

    data.push(formattedFeature);
  });

  // Now 'data' array contains features in the desired format
  console.log(data);

  // Add GeoJSON layer to the map
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      // Use the custom icon if available, otherwise, use the default icon
      const icon = feature.properties.icon || L.icon.default();
      return L.marker(latlng, { icon: icon }).bindPopup(`<strong>Name:</strong> ${feature.properties.name}<br>` +
      `<strong>Supplied:</strong> ${feature.properties.supplied}`);
    }
  }).addTo(map);
}


function displaylinesOnMap(geojsonData) {
  const data = [];
  console.log(geojsonData);

  geojsonData["linedata"].forEach(element => {
    // Check if 'element' and 'element.properties' exist before accessing 'name'
    const name = element && element.properties && element.properties.name;
    const formattedFeature = {
      "type": "Feature",
      "geometry": {
        "type": element.type,
        "coordinates": element && element.coordinates
      },
      "properties": {
        "name": name || "default",
      }
    };

    data.push(formattedFeature);
  });

  console.log(data);

  // Assuming 'data' contains your GeoJSON LineString or MultiLineString geometry
  L.geoJSON(data, {
    style: function (feature) {
      return {
        color: 'red',  // Set the color of the line
        weight: 3,      // Set the weight or thickness of the line
        opacity: 1      // Set the opacity of the line
      };
    },
    onEachFeature: function (feature, layer) {
      // You can add popup or other interactions here if needed
      // layer.bindPopup(feature.properties.name);
      layer.bindPopup(`<strong>Name:</strong> ${feature.properties.name}<br>` +
      `<strong>Supplied:</strong> ${feature.properties.supplied}`);
    }
  }).addTo(map);
}





try{
  const line_data=await fetch(`http://localhost:5001/api/getlinedata`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    }
  })
  if(!line_data.ok){
    console.log(`HTTP error! Status: ${response.satus}`);
  }
  const data=await line_data.json();
  console.log(data);
  displaylinesOnMap(data);
  
}catch(error){
console.log(`Error in fetching in Geojsondata ${error}`)}



try {
  const response = await fetch(`http://localhost:5001/api/getdata`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(!response.ok){
    console.log(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  // console.log(data);
  displayPointsOnMap(data);

} catch (error) {
  console.log(`Error fetching GeoJSON data: ${error}`);
}

// ***********************************************************************


// var cltMeasure = L.control.polyline


// Drawing a layer on map
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    position: 'bottomright',
    edit: {
        featureGroup: drawnItems,
    },
    draw: {
      marker: {
        icon: './placeholder.png'
      },
        marker: true,
        polyline: true,
        polygon: true,
        circle: true,
    },
});

map.addControl(drawControl);


// Retrieving the above drawn data


map.on('draw:created', function (e) {
  // alert("I am")
  var layer = e.layer;
  drawnItems.addLayer(layer);
  // Access the shape data and do something with it
  var shapeData = layer.toGeoJSON();
  // Store or process the shapeData as needed
  var coordinates;
  // Check if it's a Point geometry (Marker)
  if (shapeData.geometry.type === 'Point') {
    coordinates = shapeData.geometry.coordinates;
    var latitude = coordinates[1];
    var longitude = coordinates[0];

    // const textToAppend = "Hello World";
    // var mas = latitude+", "+longitude;
    let popup = document.getElementById("popup");

    function openpopup(){
        popup.classList.add("open-popup");
        alert("Infunction")
    }

    function closepopup(){
        popup.classList.remove("open-popup");
    }

    openpopup();
    
    // alert(mas);
    var pointName=prompt("enter name");
    var supplied=prompt("Is water supplied?");

    const sendPointDataToServer = async () => {
      const dataToSend = {
        "type": "Point",
        "coordinates": [longitude, latitude],
        "properties":{
          "name":pointName,
          "supplied":supplied,
        }
      }

      try {
        const response = await fetch(`http://localhost:5001/api/addpoint`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });

        const responseData = await response.json();
        console.log(`Point data sucessfully sent to server: ${responseData}`);
      } catch (error) {
        console.log(`Error in sending data: ${error}`);
      }
    }

    sendPointDataToServer();
    location.reload();
  }



  else if (shapeData.geometry.type === 'LineString') {
    coordinates = shapeData.geometry.coordinates;
    // alert(coordinates);
    // latlan(coordinates);
    let arr = [];
    // Loop through the coordinates array for each point in the line
    for (var i = 0; i < coordinates.length; i++) {
      var latitude = coordinates[i][1];
      var longitude = coordinates[i][0];
      arr.push([longitude, latitude]);
    }
    console.log(arr);
    var name = prompt("Enter Line Name: ");
    var supplied = prompt("Is water supplied?");

    const sendLineDataToServer = async () => {
      const dataToSend = {
        "type" : "LineString",
        "coordinates":arr,
        "properties":{
          "name": name || "Default Line"
        }
      }

      try {
        const response = await fetch(`http://localhost:5001/api/addline` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })

        const responseData = await response.json();
        console.log(`Line data added sucessfully to database: ${responseData}`);
      } catch (error) {
        console.log(`Error in sending data: ${error}`);
      }
    }
    sendLineDataToServer();
    location.reload();
}
});

map.on('draw:edited', function (e) {
  var layers = e.layers;
  layers.eachLayer(function (layer) {
    // Access and update the edited shape data
    var shapeData = layer.toGeoJSON();
    // Store or process the shapeData as needed
  });
});

map.on('draw:created', function (e) {
  var layer = e.layer;
  // Add your code to handle the drawn shape here
  // For example, set a custom property:

  layer.options.name = "My Line";
  layer.addTo(map);
});

map.on('click', function (e) {
  // Check if a line was clicked
  if (e.layer instanceof L.Polyline) {
    var lineName = e.layer.options.name;
    alert("Line Name: " + lineName);
  }
});