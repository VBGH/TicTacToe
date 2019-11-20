import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import layout from '../constants/Layout';
import { AdMobBanner } from 'expo-ads-admob';
import { FontAwesome } from '@expo/vector-icons';
import normalize from '../components/normalize';
import SideMenu from '../components/SideMenu';
import stylesJSON from '../styles/styles.json';
import Storage from '../components/Storage'
import Language from '../components/Language';

theme = 'silver';
dClick = false;
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
      aiLevel: 3,
      pvp: true,
      ai: false,
      computerMoveFirst: true,
      theme: 'retro',
      lang: 'en'
   }

   constructor() {
      super();
      this.sideMenu = React.createRef();
      this.storage = new Storage();
      this.storage.getTheme()
         .then(themeName => {
            if (theme !== themeName) {
               theme = themeName;
               this.setState({ theme });
            }
         }).catch(console.error);

      this.storage.getDBClick()
         .then(dBClick => {
            dClick = dBClick;
            this.setState({ dClick });
         }).catch(console.error);
      this.storage.getLang()
         .then(lang => {
            if (lang !== this.state.lang)
               this.setState({ lang });
         }).catch(console.error);
   }

   settings() {
      this.sideMenu.current.onPress();
   }

   start() {
      var marime = layout.window.width;
      var max = this.state.giant ? 15 : this.state.big ? 10 : this.state.mediu ? 5 : 3;
      var squareLength;

      squareLength = (marime - 21) / max;
      this.props.navigation.navigate('Game', props = { dClick: dClick, squareLength, max, ...this.state, theme: stylesJSON[theme] });
   }

   setDBClick = (dBClick) => {
      dClick = dBClick
      this.setState({ dClick });
      this.storage.setDBClick(dBClick).catch(console.error);
   }

   getComputerMoveFirstView() {
      if (this.state.pvp) return (<View />)
      return (
         <View>
            <Text style={[styles.title, { color: stylesJSON[theme].fontColor }]}>
               <Language text='difficulty' lang={this.state.lang} />
            </Text>
            <View style={styles.view} >
               <TouchableOpacity style={[styles.buttons, this.state.aiLevel === 1 ? styles.activeButton : {}, styles.borderRight, { shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor, backgroundColor: this.state.aiLevel === 1 ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                  onPress={() => {
                     this.setState({ aiLevel: 1, lang: 'ro' })
                  }}>
                  <Text style={[styles.longText, { color: stylesJSON[theme].fontColor }]}>
                     <Language text='easy' lang={this.state.lang} />
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.buttons, this.state.aiLevel === 2 ? styles.activeButton : {}, { shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor, backgroundColor: this.state.aiLevel === 2 ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                  onPress={() => { this.setState({ aiLevel: 2, lang: 'en' }) }}>
                  <Text style={[styles.longText, { color: stylesJSON[theme].fontColor }]}>
                     <Language text='medium' lang={this.state.lang} />
                  </Text>
               </TouchableOpacity>
            </View>
            <View style={styles.view} >
               <TouchableOpacity style={[styles.buttons, this.state.aiLevel === 3 ? styles.activeButton : {}, { shadowColor: stylesJSON[theme].shadowColor, backgroundColor: this.state.aiLevel === 3 ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                  onPress={() => { this.setState({ aiLevel: 3 }) }}>
                  <Text style={[styles.longText, { color: stylesJSON[theme].fontColor }]}>
                     <Language text='impossible' lang={this.state.lang} />
                  </Text>
               </TouchableOpacity>
            </View>
            <View style={styles.view}>
               <View style={[styles.buttons, { shadowColor: stylesJSON[theme].shadowColor }]}>
                  <TouchableOpacity
                     onPress={() => {
                        this.setState({ computerMoveFirst: !this.state.computerMoveFirst })
                     }}
                  >
                     <View>
                        {this.state.computerMoveFirst ?
                           <FontAwesome.Button name="check-square-o" backgroundColor={stylesJSON[theme].backgroundColor}
                              onPress={() => { this.setState({ computerMoveFirst: false }) }}
                              size={normalize(17)} color={stylesJSON[theme].fontColor}
                              style={[styles.longText, { color: stylesJSON[theme].fontColor }]}>
                              <Language text='movesFirst' lang={this.state.lang} />
                           </FontAwesome.Button>
                           :
                           <FontAwesome.Button name="square-o" backgroundColor={stylesJSON[theme].backgroundColor}
                              onPress={() => { this.setState({ computerMoveFirst: true }) }}
                              size={normalize(17)} color={stylesJSON[theme].playButton}
                              style={[styles.longText, { color: stylesJSON[theme].fontColor }]}
                           >
                              <Language text='movesFirst' lang={this.state.lang} />
                           </FontAwesome.Button>
                        }
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }

   changeTheme = (themeName) => {
      theme = themeName;
      this.setState({ theme });
      this.storage.setTheme(themeName).catch(console.error);
   }

   render() {
      return (
         <View style={{ height: layout.window.height }}>
            <SideMenu setDBClick={this.setDBClick} dBClick={this.state.dClick} theme={stylesJSON[theme]} ref={this.sideMenu} changeTheme={this.changeTheme}></SideMenu>
            <View style={styles.settingsButton}>
               <FontAwesome.Button name="gear"
                  backgroundColor={'transparent'}
                  onPress={() => { this.settings() }}
                  size={35}
                  color={stylesJSON[theme].fontColor}>
               </FontAwesome.Button>
            </View>
            <View style={{ height: layout.window.height }}>
               <ScrollView style={[styles.container, { backgroundColor: stylesJSON[theme].backgroundColor }]}>
                  <View>
                     <Text style={[styles.title, { color: stylesJSON[theme].fontColor }]}>
                        <Language text='oponent' lang={this.state.lang} />
                     </Text>
                     <View style={styles.view}>
                        <TouchableOpacity style={[styles.buttons, this.state.pvp ? styles.activeButton : {}, styles.borderRight, { shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor, fontSize: 15, backgroundColor: this.state.pvp ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                           onPress={() => { this.setState({ ai: false, ml: false, pvp: true, computerMoveFirst: false }) }}>
                           <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                              <Language text='player' lang={this.state.lang} />
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttons, this.state.ai ? styles.activeButton : {}, { shadowColor: stylesJSON[theme].shadowColor, backgroundColor: this.state.ai ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                           onPress={() => { this.setState({ ai: true, ml: false, pvp: false, big: false, clasic: true, mediu: false, numberCharsToWin: 3, giant: false }) }}>
                           <Text style={[styles.longText, { color: stylesJSON[theme].fontColor }]}>
                              <Language text='computer' lang={this.state.lang} />
                           </Text>
                        </TouchableOpacity>
                     </View>
                     {this.getComputerMoveFirstView()}
                     <Text style={[styles.title, { color: stylesJSON[theme].fontColor }]}>
                        <Language text='dimension' lang={this.state.lang} />
                     </Text>
                     <View style={styles.view}>
                        <TouchableOpacity style={[styles.buttons, this.state.clasic ? styles.activeButton : {}, styles.borderRight, { shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor, backgroundColor: this.state.clasic ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                           onPress={() => { this.setState({ big: false, clasic: true, mediu: false, numberCharsToWin: 3, giant: false }) }}>
                           <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                              3 X 3
                           </Text>
                        </TouchableOpacity>
                        {this.state.pvp ?
                           <TouchableOpacity style={[styles.buttons, this.state.mediu ? styles.activeButton : {}, { shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor, backgroundColor: this.state.mediu ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                              onPress={() => { this.setState({ big: false, clasic: false, mediu: true, numberCharsToWin: 3, giant: false }) }}>
                              <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                                 5 X 5
                           </Text>
                           </TouchableOpacity> : <View />}
                     </View>
                     <View style={styles.view}>
                        {this.state.pvp ?
                           <TouchableOpacity style={[styles.buttons, this.state.big ? styles.activeButton : {}, styles.borderRight, { shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor, backgroundColor: this.state.big ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                              onPress={() => { this.setState({ big: true, clasic: false, mediu: false, giant: false }) }}>
                              <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                                 10 X 10
                           </Text>
                           </TouchableOpacity>
                           : <View />}
                        {this.state.pvp ?
                           <TouchableOpacity style={[styles.buttons, this.state.giant ? styles.activeButton : {}, { shadowColor: stylesJSON[theme].shadowColor, backgroundColor: this.state.giant ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                              onPress={() => { this.setState({ big: false, clasic: false, mediu: false, giant: true }) }}>
                              <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                                 15 X 15
                           </Text>
                           </TouchableOpacity>
                           : <View />}
                     </View>
                     <Text style={[styles.title, { color: stylesJSON[theme].fontColor }]}>
                        <Language text='symbols' lang={this.state.lang} />
                     </Text>
                     <View style={[styles.view]} >
                        <TouchableOpacity style={[styles.buttons, this.state.numberCharsToWin === 3 ? styles.activeButton : {},
                        {
                           shadowColor: stylesJSON[theme].shadowColor, borderColor: stylesJSON[theme].fontColor,
                           backgroundColor: this.state.numberCharsToWin === 3 ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor
                        }]}
                           onPress={() => { this.setState({ numberCharsToWin: 3 }) }}>
                           <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                              3
                           </Text>
                        </TouchableOpacity>
                        {this.state.pvp && (this.state.mediu || this.state.big || this.state.giant) ?
                           <TouchableOpacity style={[styles.buttons, this.state.numberCharsToWin === 5 ? styles.activeButton : {}, styles.borderRight,
                           { borderColor: stylesJSON[theme].fontColor, backgroundColor: this.state.numberCharsToWin === 5 ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                              onPress={() => { (this.state.mediu || this.state.big || this.state.giant) && this.setState({ numberCharsToWin: 5 }) }}>
                              <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                                 5
                           </Text>
                           </TouchableOpacity>
                           : <View />}
                        {this.state.pvp && (this.state.big || this.state.giant) ?
                           <TouchableOpacity style={[styles.buttons, this.state.numberCharsToWin === 10 ? styles.activeButton : {}, { shadowColor: stylesJSON[theme].shadowColor, backgroundColor: this.state.numberCharsToWin === 10 ? stylesJSON[theme].buttonColorSelected : stylesJSON[theme].buttonColor }]}
                              onPress={() => { (this.state.big || this.state.giant) && this.setState({ numberCharsToWin: 10 }) }}>
                              <Text style={[styles.text, { color: stylesJSON[theme].fontColor }]}>
                                 10
                           </Text>
                           </TouchableOpacity>
                           : <View />}
                     </View>
                  </View>
                  <View style={styles.playButton}>
                     <FontAwesome.Button style={[styles.buttons, styles.activeButton]} name="caret-square-o-right" backgroundColor={stylesJSON[theme].backgroundColor} onPress={() => this.start()} size={75} color={stylesJSON[theme].playButton}>
                     </FontAwesome.Button>
                  </View>
               </ScrollView>
            </View>
            {/* <View style={styles.commercialButtom}>
               <AdMobBanner
                  bannerSize="smartBannerPortrait"
                  adUnitID="ca-app-pub-7742191891392966/7394497459"
                  onDidFailToReceiveAdWithError={
                     (error) => { console.log(error); }} />
            </View> */}
         </View >
      );
   }
}

const styles = StyleSheet.create({
   commercialButtom: {
      position: 'absolute',
      bottom: 0,
      zIndex: 2
   },
   container: {
      flex: 1,
      backgroundColor: stylesJSON[theme].backgroundColor,
      padding: 5,
      paddingTop: 25,
      zIndex: 1
   },
   view: {
      padding: 15,
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
   },
   buttons: {
      padding: 10,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 25,
      paddingTop: 25,
   },
   activeButton: {
      shadowColor: stylesJSON[theme].shadowColor,
      shadowOffset: {
         width: 20,
         height: 20,
      },
      shadowOpacity: 0.45,
      shadowRadius: 50,
      elevation: 10,
   },
   playButton: {
      // width: layout.window.width,
      bottom: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 100,
      padding: 15
   },
   text: {
      fontSize: normalize(17),
      marginTop: 0,
      color: stylesJSON[theme].fontColor
   },
   title: {
      fontSize: normalize(20),
      margin: 15,
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: stylesJSON[theme].fontColor
   },
   longText: {
      fontSize: normalize(15),
      margin: 5,
      marginTop: 0,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: stylesJSON[theme].fontColor
   },
   borderRight: {
      borderColor: stylesJSON[theme].fontColor,
   },
   settingsButton: {
      position: 'absolute',
      zIndex: 2,
      top: 5,
      left: 10
   }
});

export default LinksScreen;
