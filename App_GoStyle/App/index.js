import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('GoStyle', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('GoStyle', { rootTag });
}

state = {
  page: 1,
  results: 20,
  totalPage: 3,
  seed: 'demo',
  isFetching: false,
  data: [],
}