mapboxgl.accessToken = API_KEY;

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-90.4194, 37.7749],
zoom: 2.6
});

map.on('load', function() {
  map.addSource('Circle-Markers', {
    type: 'geojson',
    
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data:
        '/static/data/all_week.geojson',
        // cluster: true,
        // clusterMaxZoom: 14, // Max zoom to cluster points on
        // clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        
    });
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'Circle-Markers',
    filter: ['has', 'mag'],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
    'step',
    ['get', 'mag'],
    '#00A1FF',
    1,
    '#00FFD3',
    2,
    '#18FF00',
    3,
    '#FFFB00',
    4,
    '#FF7F00',
    5,
    '#FF0000'
    ],
    'circle-radius': [
    'step',
    ['get', 'mag'],
    1,
    2,
    3,
    4,
    5,
    ],
    }
    });

});

  