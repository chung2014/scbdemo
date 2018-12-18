import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const NUM_COLUMNS = 3;
const SIZE = Dimensions.get('window').width / NUM_COLUMNS;

class AlbumDetail extends Component {
  _renderItem = props => {
    const { item } = props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          this.props.navigation.navigate('MyModal', { url: item.url });
        }}
      >
        <Image source={{ uri: item.thumbnailUrl }} style={styles.item} />
      </TouchableOpacity>
    );
  };

  render() {
    const photos = this.props.navigation.getParam('photos', []);

    return (
      <View>
        <FlatList
          data={photos}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          numColumns={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: SIZE,
    height: SIZE,
  },
  item: {
    flex: 1,
    margin: 3,
  },
});

export default AlbumDetail;
