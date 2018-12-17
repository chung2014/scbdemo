'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

function urlForQueryAllUsers() {
  return 'https://jsonplaceholder.typicode.com/users';
}

function urlForQueryPostsByUserId(userId) {
  return 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;
}

function urlForQueryAlbumsByUserId(userId) {
  return 'https://jsonplaceholder.typicode.com/albums?userId=' + userId;
}

function urlForQueryTodosByUserId(userId) {
  return 'https://jsonplaceholder.typicode.com/todos?userId=' + userId;
}

const ListItem = props => {
  const { item } = props;
  const _onPress = () => props.onPressItem(item.id);

  return (
    <TouchableHighlight onPress={_onPress} underlayColor="#dddddd">
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email} numberOfLines={1}>
              {item.email}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableHighlight>
  );
};

export default class UsersResults extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: '',
      users: [],
      posts: [],
      albums: [],
      todos: [],
    };
  }

  _handleQueryAllUsersResponse = responseArray => {
    // console.log(responseArray);
    this.setState({ isLoading: false, message: '' });
    if (responseArray && responseArray.length > 0) {
      this.setState({ users: responseArray });
    } else {
      this.setState({ message: 'Location not recognized; please try again.' });
    }
  };

  _executeQuery = query => {
    console.log(query);
    this.setState({ isLoading: true });

    fetch(query)
      .then(response => response.json())
      .then(responseArray => this._handleQueryAllUsersResponse(responseArray))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error,
        }),
      );
  };

  _userKeyExtractor = item => String(item.id);

  _renderItem = ({ item }) => (
    <ListItem item={item} onPressItem={this._onPressItem} />
  );

  _handleQueryUserDetailResponse = (user, albums, posts, todos) => {
    this.setState({ isLoading: false, message: '', albums, posts, todos });

    this.props.navigation.navigate('UserDetail', {
      user,
      albums,
      posts,
      todos,
    });
  };

  _onPressItem = userId => {
    console.log('Pressed userId: ' + userId);
    const albumsUrl = urlForQueryAlbumsByUserId(userId);
    const postUrl = urlForQueryPostsByUserId(userId);
    const todosUrl = urlForQueryTodosByUserId(userId);
    console.log(albumsUrl);
    console.log(postUrl);
    console.log(todosUrl);

    this.setState({ isLoading: true });
    const albumsResponse = fetch(albumsUrl).then(response => response.json());
    const postsResponse = fetch(postUrl).then(response => response.json());
    const todosResponse = fetch(todosUrl).then(response => response.json());

    const user = this.state.users.find(user => user.id === userId);

    Promise.all([albumsResponse, postsResponse, todosResponse])
      .then(responses => {
        console.log('then in _onPressItem Promise.all');
        this._handleQueryUserDetailResponse(
          user,
          responses[0],
          responses[1],
          responses[2],
        );
      })
      .catch(error => {
        console.log('catch in _onPressItem Promise.all', error);
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error,
        });
      });
  };

  componentDidMount() {
    const query = urlForQueryAllUsers();
    this._executeQuery(query);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={this.state.users}
        keyExtractor={this._userKeyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  email: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});
