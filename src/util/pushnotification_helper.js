// import messaging from '@react-native-firebase/messaging';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
//  async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//         GetFCMToke();

//     }
// }

// async function GetFCMToke() {
//     let fcmtoken = await AsyncStorage.getItem("fcmtoken");
//     console.log(fcmtoken, "old token");
//     if (!fcmtoken) {
//         try {
//             let fcmtoken = messaging().getToken();
//             if (fcmtoken) {
//                 AsyncStorage.setItem("fcmtoken", fcmtoken);
//             } else { }
//         } catch (err) {
//             console.log(err, "error in fcmtoken");
//         }
//     }
// }

// export const NotificationListner = () => {

//     // Assume a message-notification contains a "type" property in the data payload of the screen to open
//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage.notification,
//         );
//         // navigation.navigate(remoteMessage.data.type);
//     });
//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );
//                 //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//             }
//             // setLoading(false);
//         });
//         messaging().onMessage(async remoteMessage=>{
//             console.log("notification on frogfound state......", remoteMessage);
//         })
// }

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle } from '@notifee/react-native';
import { View } from 'react-native';
// //request permission for notificatioin message
// export const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     // console.log(authStatus);
//     const enabled = 
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     if(enabled){
//         getFcmToken();
//     }
// };

// export const getFcmToken = async () =>{
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     if(!fcmToken){
//         try{
//             const token = await messaging().getToken();
//             // console.log(token);
//             if(token){
//                 await AsyncStorage.setItem('fcmToken', token)
//             }
//         }catch(error){
//             console.log(`Can not get from token ${error }`);
//         }
//     }
// };


export const notificatioinListner = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}

export const requestUserPermission = async()  => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
export const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('===========================');
    console.log(token);
    console.log('===========================');
}

export async function onDisplayNotification({title, body}) {
    // Request permissions (required for iOS)
    // await notifee.requestPermission()

    // // Create a channel (required for Android)
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    // });

    // // Display a notification
    // await notifee.displayNotification({
    //     title,
    //     body, 
    //   android: {
    //     channelId,
    //     // smallIcon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-icon&psig=AOvVaw2unn4ePGvaa6WgrN7ZsNpd&ust=1700920974987000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCylcjm3IIDFQAAAAAdAAAAABAJ', // optional, defaults to 'ic_launcher'.
    // //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // id: 'local-track',
    // title: 'Song Title',
    // body: 'Artist',
    // android: {
    //   largeIcon: 'url/to/album/artwork',
    //   style: {
    //      type:  AndroidStyle.MEDIA,
    //   },
    //   actions: [
    //     {
    //       title: 'Play',
    //       pressAction: {
    //         id: AndroidMediaStyleAction.PLAY,
    //       },
    //       icon: 'value-of-custom-icon'
    //     },
    //   ],
    //   channelId: 'channelId',
    // },
    // });


    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  
    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();
  
    // const notificationId = await notifee.displayNotification({
    //   id: '123',
    //   title: 'Notification Title',
    //   body: 'Main body content of the notification',
    //   android: {
    //     channelId,
    //   },
    // });
  
    // Sometime later...
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
}