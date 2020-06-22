import React from 'react';
import { MainScreen } from './src/screens/mainScreen';
import { NfcScreen } from './src/screens/nfcScreen';
import { QrcodeScreen } from './src/screens/qrcodeScreen';

export default class App extends React.Component {
  public render() {
    return <QrcodeScreen />;
  }
}
