import React from 'react';
import firebase from 'react-native-firebase';
import { MainScreen } from './src/screens/mainScreen';
import { NfcScreen } from './src/screens/nfcScreen';
import { QrcodeScreen } from './src/screens/qrcodeScreen';
import { Platform, AsyncStorage, Alert } from 'react-native';

export default class App extends React.Component {
  private notificationListener: any;
  private notificationOpenedListener: any;
  private messageListener: any;

  private checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  private getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken: ', fcmToken);
  };

  private requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  private createNotificationListeners = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        console.log('onNotification:');
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setSound('sampleaudio')
          .android.setChannelId('fcm_FirebaseNotification_default_channel')
          .android.setSmallIcon('@drawable/ic_launcher')
          .android.setColor('#000000')
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch((err) => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_FirebaseNotification_default_channel',
      'Demo app name',
      firebase.notifications.Android.Importance.High
    )
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log('onNotificationOpened:');
        Alert.alert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log('JSON.stringfy: ', JSON.stringify(message));
    });
  };

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  public render() {
    return <QrcodeScreen />;
  }
}
