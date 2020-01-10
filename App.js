/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Checkout from "./Checkout";
import Home from "./Home"

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Home" component={Home} title="Home" initial/>
          <Scene key="Checkout" component={Checkout} title="Checkout" />
        </Stack>
      </Router>
    );
  }
}