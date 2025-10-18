import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Details = () => {
  return (
    <View style={styles.box}>
      <Text>Details</Text>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'red'
    }
})