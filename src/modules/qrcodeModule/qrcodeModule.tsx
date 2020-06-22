import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Barcode, RNCamera } from 'react-native-camera';

export default class QrcodeModule {
  private cameraRef: React.RefObject<RNCamera>;
  private barcodes: Barcode[];

  constructor() {
    this.cameraRef = React.createRef();
    this.barcodes = [];
  }

  private barcodeRecognized = ({ barcodes }: { barcodes: Barcode[] }) => {
    this.barcodes = barcodes;
  };

  private renderBarcodes = () => {
    return <View>{this.barcodes[0].data}</View>;
  };

  public camera = () => {
    return (
      <RNCamera
        ref={this.cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
        {this.renderBarcodes()}
      </RNCamera>
    );
  };
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    flexGrow: 1
  }
});
