import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

class App extends Component {

 state = {
   venues: []
 }

componentDidMount() {
  this.getVenues()
}

renderMap = () => {
  loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDz8Lb7O02uGC1hF0WtlxMnZLjYEE9cZnM&callback=initMap')
  window.initMap = this.initMap
}

getVenues = () => {
  const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
  const parameters = {
    client_id: 'FK3KTBUB3HXD41R1WZZNEWYDY0EETC4NTTKGNR3FQUK10LUO',
    client_secret: 'ZBHLKNGN5OLDFJFJ4ZAKUZEEJZFWY0MNPAURL5MERLTRVL15',
    query: 'coffee',
    near: 'Phoenix',
    v: '20183010'
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
      venues: response.data.response.groups[0].items
    }, this.renderMap())
  })
  .catch(error => {
    console.log('ERROR!! ' + error)
  })
}

initMap = () => {

  // create map
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.4484, lng: -112.0740},
    zoom: 8
  });

  //create info window
  var infowindow = new window.google.maps.InfoWindow()

  // create dynamic markers
  this.state.venues.map(myVenue => {

    var contentString = `${myVenue.venue.name}`

    // create marker
    var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      map: map,
      title: myVenue.venue.name
    })

    // Open info window for info
    marker.addListener('click', function() {

      // change the content
      infowindow.setContent(contentString)

      // open venue's infowindow
      infowindow.open(map, marker);
    });
  });
};

  render() {
    return (
      <main>
      <div id='map'></div>
      </main>
    );
  }
}

/*
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDz8Lb7O02uGC1hF0WtlxMnZLjYEE9cZnM&callback=initMap"
    async defer></script>
*/

function loadScript(url) {
  var index = window.document.getElementsByTagName('script') 
  [0]
  var script = window.document.createElement('script')
  script.source = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
