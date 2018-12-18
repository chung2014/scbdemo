import React, { Component } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import Svg, { Path } from 'react-native-svg';

import {
  StyleSheet,
  View,
  Text,
  Image,
  SectionList,
  TouchableHighlight,
  FlatList,
} from 'react-native';

const InMessageView = props => (
  <View style={[styles.item, styles.itemIn]}>
    <View
      style={[
        styles.balloon,
        styles.dialogBalloon,
        { backgroundColor: 'lightgrey' },
      ]}
    >
      {props.children}
      <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
        <Svg
          style={styles.arrowLeft}
          width={moderateScale(15.5, 0.6)}
          height={moderateScale(17.5, 0.6)}
          viewBox="32.484 17.5 15.515 17.5"
          // enable-background="new 32.485 17.5 15.515 17.5"
        >
          <Path
            d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
            fill="lightgrey"
            x="0"
            y="0"
          />
        </Svg>
      </View>
    </View>
  </View>
);

const OutMessageView = props => (
  <View style={[styles.item, styles.itemOut]}>
    <View
      style={[
        styles.balloon,
        styles.dialogBalloon,
        { backgroundColor: '#1084ff' },
      ]}
    >
      {props.children}
      <View style={[styles.arrowContainer, styles.arrowRightContainer]}>
        <Svg
          style={styles.arrowRight}
          width={moderateScale(15.5, 0.6)}
          height={moderateScale(17.5, 0.6)}
          viewBox="32.485 17.5 15.515 17.5"
          enable-background="new 32.485 17.5 15.515 17.5"
        >
          <Path
            d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
            fill="#1084ff"
            x="0"
            y="0"
          />
        </Svg>
      </View>
    </View>
  </View>
);

const TopicMessageView = props => (
  <View style={[styles.item, styles.itemTopic]}>
    <View style={[styles.balloon, { backgroundColor: '#1084ff' }]}>
      {props.children}
    </View>
  </View>
);

class Messages extends Component {
  _renderItem = props => {
    const { item, section } = props;

    if (section.title === '') {
      return (
        <TopicMessageView>
          <Text style={{ paddingTop: 4, color: 'white', fontWeight: 'bold' }}>
            {item.title}
          </Text>
          <Text style={{ color: 'white' }}>
            {item.body}
          </Text>
        </TopicMessageView>
      );
    }

    return (
      <InMessageView>
        <Text style={{ paddingTop: 4, fontWeight: 'bold' }}>{`${item.name}(${
          item.email
        })`}</Text>
        <Text style={{ color: 'black' }}>{item.body}</Text>
      </InMessageView>
    );
  };

  render() {
    const post = this.props.navigation.getParam('post', null);
    const comments = this.props.navigation.getParam('comments', []);
    return (
      <SectionList
        sections={[
          { title: '', data: [post] },
          { title: 'comments', data: comments },
        ]}
        data={comments}
        renderItem={this._renderItem}
        renderSectionHeader={({ section }) =>
          section.title === '' ? (
            <View />
          ) : (
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
          )
        }
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    // backgroundColor: 'yellow',
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row',
  },
  itemIn: {
    marginLeft: 20,
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  itemTopic: {
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  balloon: {
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  dialogBalloon: {
    maxWidth: moderateScale(250, 2),
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
});

export default Messages;
