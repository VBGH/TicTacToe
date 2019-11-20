import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import layout from '../constants/Layout';
import { FontAwesome } from '@expo/vector-icons';
import normalize from '../components/normalize';

class SideMenu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         height: 0,
         width: 0,
         zIndex: 0,
         twoTimes: this.props.dBClick
      };
   }
   componentWillReceiveProps(props) {
      if (this.state.twoTimes !== props.dBClick)
         this.setState({ twoTimes: props.dBClick });
   }

   onPress() {
      this.setState({ height: layout.window.height, width: layout.window.width, display: 'flex', zIndex: 10 });
   }

   onClose(themeName) {
      this.setState({ height: 0, width: 0, display: 'none', zIndex: 0 });
      if (themeName) this.props.changeTheme(themeName);
   }

   setDBClick(dBClick) {
      this.setState({ twoTimes: dBClick });
      this.props.setDBClick(dBClick);
   }

   render() {
      var { backgroundColor, fontColor } = this.props.theme;
      return (
         <View style={[styles.sidenav, { backgroundColor, height: this.state.height, width: this.state.width, display: this.state.display, zIndex: this.state.zIndex }]}>
            <View >
               <FontAwesome.Button name="close" backgroundColor={backgroundColor}
                  onPress={() => { this.onClose() }} size={30} color={fontColor}>
               </FontAwesome.Button>
            </View>
            <View style={{ height: layout.window.height / 2 }}>
              
               <View style={styles.view} >
                  <TouchableOpacity style={[styles.buttons]}
                     onPress={() => { this.onClose('silver') }}>
                     <View style={styles.right}>
                        <Text style={[styles.text, styles.left, { color: fontColor }]}>Silver</Text>

                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#f5f5f5"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#616161"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#bdbdbd"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#eeeeee"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "black"
                        }}></View>
                     </View>

                  </TouchableOpacity>
               </View>

               <View style={styles.view} >
                  <TouchableOpacity style={[styles.buttons]}
                     onPress={() => { this.onClose('black') }}>
                     <View style={styles.right}>
                        <Text style={[styles.text, styles.left, { color: fontColor }]}>Black</Text>

                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "black"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "white"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "black"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "grey"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "white"
                        }}></View>
                     </View>
                  </TouchableOpacity>
               </View>

               <View style={styles.view}>
                  <TouchableOpacity style={[styles.buttons]}
                     onPress={() => { this.onClose('blue') }}>
                     <View style={styles.right}>
                        <Text style={[styles.text, styles.left, { color: fontColor }]}>Blue</Text>

                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#1d2c4d"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#8ec3b9"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#1d2c4d"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#4b6878"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#8ec3b9"
                        }}></View>
                     </View>
                  </TouchableOpacity>
               </View>

               <View style={styles.view}>
                  <TouchableOpacity style={[styles.buttons]}
                     onPress={() => { this.onClose('red') }}>
                     <View style={styles.right}>
                        <Text style={[styles.text, styles.left, { color: fontColor }]}>Red</Text>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#ad2222"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#ffffff"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "red"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#d31b1b"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#ffffff"
                        }}></View>
                     </View>
                  </TouchableOpacity>
               </View>

               <View style={styles.view}>
                  <TouchableOpacity style={[styles.buttons]}
                     onPress={() => { this.onClose('retro') }}>
                     <View style={styles.right}>
                        <Text style={[styles.text, styles.left, { color: fontColor }]}>Retro</Text>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#f2eecb"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "black"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "#f2eecb"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "white"
                        }}></View>
                        <View style={{
                           width: layout.window.width / 10, borderWidth: 1, borderColor: fontColor,
                           height: 20, backgroundColor: "black"
                        }}></View>
                     </View>
                  </TouchableOpacity>
               </View>

               <View style={[styles.view, styles.right]} >
                  <TouchableOpacity
                     onPress={() => {
                        this.setState({ twoTimes: true })
                     }}
                  >
                     <View>
                        {this.state.twoTimes ?
                           <FontAwesome.Button name="check-square-o"
                              backgroundColor={backgroundColor}
                              color={fontColor}
                              onPress={() => { this.setDBClick(false); }}

                              size={normalize(25)}
                           >
                              Double tap to mark
                           </FontAwesome.Button>
                           :
                           <FontAwesome.Button name="square-o"
                              backgroundColor={backgroundColor}
                              color={fontColor}
                              onPress={() => { this.setDBClick(true); }}
                              size={normalize(25)}
                           >
                              Double tap to mark
                           </FontAwesome.Button>
                        }
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </View >
      );
   }
}


const styles = StyleSheet.create({
   sidenav: {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      left: 0,
      backgroundColor: '#fff',
      textAlign: 'center',
      display: 'none',
   },
   view: {
      padding: 15,
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      height: 40
   },
   text: {
      fontSize: normalize(20),
      marginTop: 0,
   },
   buttons: {
      padding: 5,
      flex: 1,
      flexDirection: 'row',
   },
   right: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
   },
   left: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
   }
});
export default SideMenu;
