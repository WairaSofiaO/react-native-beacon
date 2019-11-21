/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import CBBeacon from 'react-native-beacon';

export default class App extends Component<{}> {
  state = {
    status: 'starting',
    message: '--'
  };

  componentDidMount() {
    CBBeacon.locationServicesEnabled((flag) => {
      console.log('LocationServices: ' + flag);
      if (!flag) {
        CBBeacon.openLocationSettings();
      } else {
        CBBeacon.requestAlwaysAuthorization();
      }
    });
    CBBeacon.centralManagerDidUpdateState((state) => {
      console.log('BluetoothState: ' + state);

      if (state === 'powerOff') {
        CBBeacon.openBluetoothSettings();
      }
    });
    CBBeacon.didChangeAuthorizationStatus((status) => {
      console.log('AuthorizationStatus: ' + status);

      if (status === 'authorizedAlways') {
        console.log('OK, start ranging beacons');
      }
    });
    CBBeacon.didRangeBeacons((region, beacons) => {
      console.log(region.identifier + ' : ' + beacons.length);
    });

    CBBeacon.initialize();
    CBBeacon.onBeaconServiceConnect(() => {
      console.log('BeaconServiceConnected');

      CBBeacon.startRangingBeaconsInRegion({
        identifier: 'Cubeacon',
        uuid: 'CB10023F-A318-3394-4199-A8730C7C1AEC'
      });
    });
    CBBeacon.sampleMethod('Testing', 123, (message) => {
      this.setState({
        status: 'native callback received',
        message
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>☆CBBeacon example☆</Text>
        <Text style={styles.instructions}>STATUS: {this.state.status}</Text>
        <Text style={styles.welcome}>☆NATIVE CALLBACK MESSAGE☆</Text>
        <Text style={styles.instructions}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
