import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import FetchLocation from './src/components/fetchlocation'
import UsersMap from './src/components/usermap'

export default class App extends React.Component {

  state = {
    userLocation: null,
    userPlaces: []
  }

  //get user locations
  getUserLocationHandler = () => {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: 0.0622,
          latitudeDelta: 0.0421
        }
      })
      //storing locations
      fetch('https://thefaith-1cca3.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }).then(res => console.log(res)).catch(err => console.log(err))
    }, err => console.log(err))
  }

  //get user places from db
  getUserPlacesHandler = () => {
    fetch('https://thefaith-1cca3.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          })
        }
        this.setState({
          userPlaces: placesArray
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button style={styles.button} title="Get User Places" onPress={this.getUserPlacesHandler} />
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} userPlaces={this.state.userPlaces} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginBottom: 20
  }
})