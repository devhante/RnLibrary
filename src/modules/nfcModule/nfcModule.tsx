import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

export default class NfcModule {
    componentDidMount() {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
            console.warn('tag', tag);
            NfcManager.setAlertMessageIOS('I got your tag!');
            NfcManager.unregisterTagEvent().catch(() => 0);
        });
    }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }

    public test = async () => {
        try {
            await NfcManager.registerTagEvent();
        } catch (exception) {
            console.warn('exception', exception);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    }

    public cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
}