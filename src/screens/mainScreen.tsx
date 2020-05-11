import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export class MainScreen extends React.Component {
    private handlePressNfcButton = () => {

    }

    public render() {
        return (
            <View style={styles.mainScreen}>
                <Text style={styles.title}>React Native Libraries</Text>
                <Button
                    title="NFC"
                    onPress={this.handlePressNfcButton}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainScreen: {
        padding: 24
    },
    title: {
        marginBottom: 24,
        textAlign: 'center',
        fontSize: 24
    }
});