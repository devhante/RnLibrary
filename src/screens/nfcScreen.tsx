import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import NfcModule from '../modules/nfcModule/nfcModule';

interface IProps {}

interface IState {
  id: string;
  techTypes: string;
}

export class NfcScreen extends React.Component<IProps, IState> {
  private nfcModule: NfcModule;

  state: IState = {
    id: '',
    techTypes: ''
  };

  constructor(props: IProps) {
    super(props);
    this.nfcModule = new NfcModule(this.handleRead);
    this.nfcModule.open();
  }

  private handleRead = (id: string, techTypes: string) => {
    this.setState({ id: id, techTypes: techTypes });
  };

  private handlePressTestButton = () => {
    this.nfcModule.test();
  };

  private handlePressCancelButton = () => {
    this.nfcModule.cancel();
  };

  public render() {
    return (
      <View style={styles.nfcScreen}>
        <Text style={styles.title}>NFC Module</Text>
        <View style={styles.button}>
          <Button title="Test" onPress={this.handlePressTestButton} />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" onPress={this.handlePressCancelButton} />
        </View>
        <Text style={styles.title}>ID : {this.state.id}</Text>
        <Text style={styles.title}>TechTypes : {this.state.techTypes}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nfcScreen: {
    padding: 24
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24
  },
  button: {
    marginBottom: 24
  }
});
