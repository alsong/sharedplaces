import React from 'react'
import { Button } from 'react-native'

export default fetchLocation = props =>{
    return (
        <Button title="Get Location" onPress={props.onGetLocation}/>
    )
}