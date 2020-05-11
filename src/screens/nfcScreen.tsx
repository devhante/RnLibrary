import React from 'react'
import { Button, StyleSheet, Text, View} from 'react-native';
import NfcModule from '../modules/nfcModule/nfcModule';

export class NfcScreen extends React.Component {
    private nfcModule: NfcModule;

    constructor(props: any) {
        super(props);
        this.nfcModule = new NfcModule();
    }

    private handlePressTestButton = () => {
        this.nfcModule.test();
    }

    private handlePressCancelButton = () => {
        this.nfcModule.cancel();
    }

    public render() {
        return (
            <View style={styles.nfcScreen}>
                <Text style={styles.title}>NFC Module</Text>
                <View style={styles.button}>
                    <Button
                        title="Test"
                        onPress={this.handlePressTestButton}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Cancel"
                        onPress={this.handlePressCancelButton}
                    />
                </View>
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