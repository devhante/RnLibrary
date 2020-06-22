import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Barcode, RNCamera } from 'react-native-camera';
import QrcodeModule from '../modules/qrcodeModule/qrcodeModule';

interface IProps {}

interface IState {
  barcodes: Barcode[];
}

export class QrcodeScreen extends React.Component<IProps, IState> {
  private cameraRef: React.RefObject<RNCamera>;

  state: IState = {
    barcodes: []
  };

  constructor(props: IProps) {
    super(props);
    this.cameraRef = React.createRef();
  }

  private barcodeRecognized = ({ barcodes }: { barcodes: Barcode[] }) => {
    this.setState({ barcodes: barcodes });
  };

  private renderBarcodes = () => {
    return <View>{this.state.barcodes[0].data}</View>;
  };

  public render() {
    return (
      <View style={styles.qrcodeScreen}>
        <Text style={styles.title}>QRCode Module</Text>
        <RNCamera
          ref={this.cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
          {this.renderBarcodes()}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  qrcodeScreen: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24
  },
  camera: {
    width: '100%',
    flexGrow: 1
  }
});
