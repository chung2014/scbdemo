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
import AlbumDetail from './AlbumDetail';
import ImageViewerModal from './ImageViewerModal';

const MainStack = createStackNavigator(
  {
    UsersResults: UsersResults,
    UserDetail: UserDetail,
    Messages: Messages,
    AlbumDetail: AlbumDetail,
  },
  {
    initialRouteName: 'UsersResults',
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ImageViewerModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
