import { AsyncStorage } from 'react-native';
const defaultStas = [
   {
      'player': 0,
      'draw': 0,
      'computer': 0
   }, {
      'player': 0,
      'draw': 0,
      'computer': 0
   }, {
      'player': 0,
      'draw': 0,
      'computer': 0
   }
]

class Storage {
   constructor() {
   }

   async getStats(stats) {
      return JSON.parse(await AsyncStorage.getItem(stats)) || defaultStas[stats-1];
   }

   async setStats(stats, value) {
      await AsyncStorage.setItem(stats, JSON.stringify(value));
   }
}

export default Storage;