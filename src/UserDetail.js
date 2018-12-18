import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  SectionList,
  TouchableHighlight,
} from 'react-native';

// presentation component
const UserDetailRenderItem = props => {
  const { item, index, section } = props;
  const _onPressPostItem = () => props.onPressPostItem(item.id);
  const _onPressAlbumItem = () => props.onPressAlbumItem(item.id);

  if (section.title === 'Address') {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{item[0]}: </Text>
            <Text style={styles.textDetail}>{item[1]}</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    );
  } else if (section.title === 'Albums') {
    return (
      <TouchableHighlight onPress={_onPressAlbumItem} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <View style={{ height: 44, justifyContent: 'center' }}>
              <Text>{item.title}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  } else if (section.title === 'Posts') {
    return (
      <TouchableHighlight onPress={_onPressPostItem} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <View style={{ height: 44, justifyContent: 'center' }}>
              <Text
                style={styles.textTitle}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                style={styles.textDetail}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.body}
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  } else if (section.title === 'Todos') {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View
            style={{
              flex: 1,
              height: 44,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <Text style={styles.todoIndicator}>
              {item.completed ? '✅' : ' '}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  return <View />;
};

// container component
class UserDetail extends Component {
  _onAlbumPressed = async albumId => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    );
    const photos = await response.json();

    this.props.navigation.navigate('AlbumDetail', {
      photos,
    });
  };

  _onPostPressed = async postId => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    const comments = await response.json();
    const user = this.props.navigation.getParam('user', null);

    const posts = this.props.navigation.getParam('posts', []);
    const post = posts.find(post => post.id === postId);

    this.props.navigation.navigate('Messages', {
      comments,
      user,
      post,
    });
  };

  _renderItem = props => {
    return (
      <UserDetailRenderItem
        {...props}
        onPressAlbumItem={this._onAlbumPressed}
        onPressPostItem={this._onPostPressed}
      />
    );
  };

  render() {
    const user = this.props.navigation.getParam('user', null);

    const albums = this.props.navigation.getParam('albums', []);
    const posts = this.props.navigation.getParam('posts', []);
    const todos = this.props.navigation.getParam('todos', []);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            resizeMode="center"
            style={{
              backgroundColor: 'yellow',
              marginTop: 8,
              height: 120,
              width: 120,
            }}
            source={require('../Resources/usericon.png')}
          />
        </View>

        <SectionList
          style={{ flex: 1, marginTop: 8 }}
          renderItem={this._renderItem}
          renderSectionHeader={({ section }) => (
            <Text
              style={{
                paddingTop: 2,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 2,
                fontSize: 14,
                fontWeight: 'bold',
                backgroundColor: 'rgba(247,247,247,1.0)',
              }}
            >
              {section.title}
            </Text>
          )}
          sections={[
            {
              title: 'Address',
              data: [
                ['Street', user.address.street],
                ['Suite', user.address.suite],
                ['City', user.address.city],
                ['Zipcode', user.address.zipcode],
                ['Lat', user.address.geo.lat],
                ['Lng', user.address.geo.lng],
              ],
            },
            { title: 'Albums', data: albums },
            { title: 'Posts', data: posts },
            { title: 'Todos', data: todos },
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
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
  textTitle: {
    fontWeight: 'bold',
  },
  textDetail: {
    marginTop: 4,
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
  todoIndicator: { width: 24 },
});

export default UserDetail;
