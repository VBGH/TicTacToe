import React from 'react';
import { View, StyleSheet, TouchableHighlight, Modal, Text } from 'react-native';
import layout from '../constants/Layout';
import normalize from '../components/normalize';

class PauseModalComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
      };
   }

   onPress() {
      this.setState({ visible: true });
   }

   render() {
      const { backgroundColor, fontColor, buttonColorSelected, playButton } = this.props.theme;

      return (
         <View>
            <Modal
               animationType="fade"
               transparent={true}
               visible={this.state.visible}
               presentationStyle='overFullScreen'
               backButtonClose={true}
            >
               <View style={{ backgroundColor: backgroundColor, paddingTop: 50, height: layout.window.height - 90 }}>
                  <Text style={{
                     fontSize: normalize(50),
                     color: playButton,
                     justifyContent: 'center',
                     alignItems: 'center',
                     alignSelf: 'center',
                  }} >PAUSE</Text>
                  <View style={styles.view} >
                     <TouchableHighlight style={[styles.buttons, { backgroundColor: buttonColorSelected }]} onPress={() => { this.setState({ visible: false }); }}>
                        <Text style={{ fontSize: normalize(25), color: fontColor }}>Resume</Text>
                     </TouchableHighlight>

                     <TouchableHighlight style={[styles.buttons, { backgroundColor: buttonColorSelected }]} onPress={() => { this.setState({ visible: false }); this.props.create() }}>
                        <Text style={{ fontSize: normalize(25), color: fontColor }}>Restart  {this.props.thirdTime > 4 ? '\n (ADS)' : ""}</Text>
                     </TouchableHighlight>

                     <TouchableHighlight style={[styles.buttons, { backgroundColor: buttonColorSelected }]} onPress={() => { this.setState({ visible: false }); this.props.destroy() }}>
                        <Text style={{ fontSize: normalize(25), color: fontColor }}>Home  {this.props.thirdTime > 4 ? '\n (ADS)' : ""}</Text>
                     </TouchableHighlight>
                  </View>
               </View>
            </Modal>
         </View >
      );
   }
}


const styles = StyleSheet.create({
   buttons: {
      padding: 5,
      margin: 30,
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
   view: {
      padding: 5,
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column'
   },
});

export default PauseModalComponent;
