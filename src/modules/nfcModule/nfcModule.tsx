import NfcManager, { NfcEvents, TagEvent } from 'react-native-nfc-manager';

export default class NfcModule {
    private onRead: (id: string, techTypes: string) => (void);

    constructor(onRead: (id: string, techTypes: string) => (void)) {
        this.onRead = onRead;
    }

    public open() {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
            console.warn('tag', tag);
            this.onRead(tag.id?.toString() as string, tag.techTypes?.toString() as string);
            NfcManager.setAlertMessageIOS('I got your tag!');
            NfcManager.unregisterTagEvent().catch(() => 0);
        });
    }

    public close() {
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
        this.onRead('', '');
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
}