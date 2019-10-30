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
      return JSON.parse(await AsyncStorage.getItem(stats)) || defaultStas[stats - 1];
   }

   async setStats(stats, value) {
      await AsyncStorage.setItem(stats, JSON.stringify(value));
   }

   async getTheme() {
      return JSON.parse(await AsyncStorage.getItem('theme')) || 'retro';
   }

   async setTheme(theme) {
      await AsyncStorage.setItem('theme', JSON.stringify(theme));
   }

   async getDBClick() {
      return JSON.parse(await AsyncStorage.getItem('dBClick')) || false;
   }

   async setDBClick(dBClick) {
      await AsyncStorage.setItem('dBClick', JSON.stringify(dBClick));
   }
}

export default Storage;