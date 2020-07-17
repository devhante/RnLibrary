import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Barcode, RNCamera, BarCodeType } from 'react-native-camera';

interface IProps {}

interface IState {}

export class QrcodeScreen extends React.Component<IProps, IState> {
  private cameraRef: React.RefObject<RNCamera>;

  constructor(props: IProps) {
    super(props);
    this.cameraRef = React.createRef();
  }

  public render() {
    return (
      <View style={styles.qrcodeScreen}>
        <Text style={styles.title}>QRCode Module</Text>

        <RNCamera
          ref={this.cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        />
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
