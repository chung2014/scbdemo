/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import UsersResults from './UsersResults';
import UserDetail from './UserDetail';
import Messages from './Messages';

const AppNavigator = createStackNavigator(
  {
    UsersResults: UsersResults,
    UserDetail: UserDetail,
    Messages: Messages
  },
  {
    initialRouteName: 'UsersResults',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
