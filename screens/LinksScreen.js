import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, CheckBox, Alert } from 'react-native';
import layout from '../constants/Layout';
import { AdMobBanner } from 'expo-ads-admob';
import { FontAwesome } from '@expo/vector-icons';
import normalize from '../components/normalize';

class LinksScreen extends React.Component {
   static navigationOptions = {
      header: null,
   };
   state = {
      clasic: true,
      mediu: false,
      big: false,
      giant: false,
      numberCharsToWin: 3,
      pvp: true,
      computerMoveFirst: false
   }

   start() {
      var marime = layout.window.width;
      var max = this.state.giant ? 15 : this.state.big ? 10 : this.state.mediu ? 5 : 3;
      var squareLength;

      squareLength = (marime - 21) / max;

      this.props.navigation.navigate('Game', props = { squareLength, max, ...this.state });
   }

   getComputerMoveFirstView() {
      if (this.state.pvp) return (<View />)

      return (
         <View style={styles.view}>
            <View style={[styles.buttons]}>
               <CheckBox
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  value={this.state.computerMoveFirst}
                  onValueChange={() => this.setState({ computerMoveFirst: !this.state.computerMoveFirst })}
               />
               <Text>Computer moves first</Text>
            </View>
         </View>
      )
   }

   mlOnPress() {
      Alert.alert(
         `Soon`,
         'Machine learning will be available soon!',
         [
            {
               text: 'OK', onPress: () => {
               }
            },
         ],
      );
   }

   render() {
      return (
         <View style={{ height: layout.window.height }}>
            <View style={{ height: layout.window.height }}>
               <ScrollView style={styles.container}>
                  <View>
                     <Text style={styles.title}>
                        Chose your oponent:
                     </Text>
                     <View style={styles.view}>
                        <TouchableOpacity style={[styles.buttons, { fontSize: 15, backgroundColor: this.state.pvp ? '#f2eecb' : 'white' }]}
                           onPress={() => { this.setState({ ai: false, ml: false, pvp: true, computerMoveFirst: false }) }}>
                           <Text style={styles.text}>
                              PVP
                           </Text>
                        </TouchableOpacity>
                     </View>
                     <View style={styles.view}>
                        <TouchableOpacity style={[styles.buttons, { borderRightWidth: 1, backgroundColor: this.state.ai ? '#f2eecb' : 'white' }]}
                           onPress={() => { this.setState({ ai: true, ml: false, pvp: false, big: false, clasic: true, mediu: false, numberCharsToWin: 3, giant: false }) }}>
                           <Text style={styles.longText}>
                              Artificial intelligence
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttons, { fontSize: 15, backgroundColor: this.state.ml ? '#f2eecb' : 'white' }]}
                           onPress={() => { this.mlOnPress(); }}>
                           <Text style={styles.longText}>
                              Machine learning
                           </Text>
                        </TouchableOpacity>
                     </View>
                     {this.getComputerMoveFirstView()}

                     <Text style={styles.title}>
                        Map dimension:
                     </Text>
                     <View style={styles.view}>
                        <TouchableOpacity style={[styles.buttons, { borderRightWidth: 1, backgroundColor: this.state.clasic ? '#f2eecb' : 'white' }]}
                           onPress={() => { this.setState({ big: false, clasic: true, mediu: false, numberCharsToWin: 3, giant: false }) }}>
                           <Text style={styles.text}>
                              3x3
                           </Text>
                        </TouchableOpacity>
                        {this.state.pvp ?
                           <TouchableOpacity style={[styles.buttons, { backgroundColor: this.state.mediu ? '#f2eecb' : 'white' }]}
                              onPress={() => { this.setState({ big: false, clasic: false, mediu: true, numberCharsToWin: 3, giant: false }) }}>
                              <Text style={styles.text}>
                                 5x5
                           </Text>
                           </TouchableOpacity> : <View />}
                     </View>
                     {this.state.pvp ?

                        <View style={styles.view}>
                           <TouchableOpacity style={[styles.buttons, { borderRightWidth: 1, backgroundColor: this.state.big ? '#f2eecb' : 'white' }]}
                              onPress={() => { this.setState({ big: true, clasic: false, mediu: false, giant: false }) }}>
                              <Text style={styles.text}>
                                 10x10
                           </Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={[styles.buttons, { backgroundColor: this.state.giant ? '#f2eecb' : 'white' }]}
                              onPress={() => { this.setState({ big: false, clasic: false, mediu: false, giant: true }) }}>
                              <Text style={styles.text}>
                                 15x15
                           </Text>
                           </TouchableOpacity>
                        </View>
                        : <View />}
                     <Text style={styles.title}>
                        Number of symbols to align:
                     </Text>
                     <View style={styles.view} >
                        <TouchableOpacity style={[styles.buttons, { borderRightWidth: 1, backgroundColor: this.state.numberCharsToWin === 3 ? '#f2eecb' : 'white' }]}
                           onPress={() => { this.setState({ numberCharsToWin: 3 }) }}>
                           <Text style={styles.text}>
                              3
                           </Text>
                        </TouchableOpacity>
                        {this.state.pvp ?

                           <TouchableOpacity style={[styles.buttons, { borderRightWidth: 1, backgroundColor: this.state.numberCharsToWin === 5 ? '#f2eecb' : 'white' }]}
                              activeOpacity={this.state.mediu || this.state.big || this.state.giant ? 1 : 0.7}
                              onPress={() => { (this.state.mediu || this.state.big || this.state.giant) && this.setState({ numberCharsToWin: 5 }) }}>
                              <Text style={styles.text}>
                                 5
                           </Text>
                           </TouchableOpacity>
                           : <View />}
                        {this.state.pvp ?

                           <TouchableOpacity style={[styles.buttons, { backgroundColor: this.state.numberCharsToWin === 10 ? '#f2eecb' : 'white' }]}
                              activeOpacity={this.state.big || this.state.giant ? 1 : 0.7} onPress={() => { (this.state.big || this.state.giant) && this.setState({ numberCharsToWin: 10 }) }}>
                              <Text style={styles.text}>
                                 10
                           </Text>
                           </TouchableOpacity>
                           : <View />}
                     </View>
                  </View>
                  <View style={styles.playButton}>
                     <FontAwesome.Button name="play-circle-o" backgroundColor="#f2eecb" onPress={() => this.start()} size={75} color="black">

                     </FontAwesome.Button>
                  </View>
               </ScrollView>
            </View>

            <View style={styles.commercialButtom}>
               <AdMobBanner
                  bannerSize="smartBannerPortrait"
                  adUnitID="ca-app-pub-7742191891392966/7394497459"
                  onDidFailToReceiveAdWithError={
                     (error) => { console.log(error); }} />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   commercialButtom: {
      position: 'absolute',
      bottom: 0,
   },
   container: {
      flex: 1,
      backgroundColor: '#f2eecb',
      padding: 5,
      paddingTop: 15,
   },
   view: {
      padding: 15,
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
   },
   buttons: {
      backgroundColor: '#fff',
      padding: 15,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
         width: 5,
         height: 5,
      },
      shadowOpacity: 0.45,
      shadowRadius: 10,
      flexDirection: 'row',
      elevation: 10,
   },
   playButton: {
      padding: 15,
      bottom: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      elevation: 10,
      paddingBottom: 100
   },
   text: {
      fontSize: normalize(30),
      margin: 15,
      marginTop: 0
   },
   title: {
      fontSize: normalize(25),
      margin: 15,
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
   },
   longText: {
      fontSize: normalize(15),
      margin: 5,
      marginTop: 0,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
   }
});

export default LinksScreen;
