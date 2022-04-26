/**
 * @format
 */

import { AppRegistry } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import replaceAllInserter from 'string.prototype.replaceall'
import { name as appName } from './app.json'
import App from './src/App'

replaceAllInserter.shim()
AppRegistry.registerComponent(appName, () => App)
RNBootSplash.hide()
