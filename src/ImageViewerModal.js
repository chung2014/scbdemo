import React, { Component } from 'react';

import ImageViewer from 'react-native-image-zoom-viewer';

class ImageViewerModal extends Component {
  render() {
    const url = this.props.navigation.getParam('url', '');
    console.log('url');
    console.log(url);
    const images = [{ url }];

    return <ImageViewer imageUrls={images} />;
  }
}

export default ImageViewerModal;
