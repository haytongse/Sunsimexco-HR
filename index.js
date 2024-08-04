/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import {linking} from 'react-native';
const index = () => {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });

AppRegistry.registerComponent(appName, () => index);
