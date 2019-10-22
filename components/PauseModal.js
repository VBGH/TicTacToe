import React from 'react';
import { View, StyleSheet, TouchableHighlight, Modal, Text } from 'react-native';
import layout from '../constants/Layout';

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
      return (
         <View>
            <Modal
               animationType="fade"
               transparent={true}
               visible={this.state.visible}
               presentationStyle='overFullScreen'
               backButtonClose={true}
            >
               <View style={{ backgroundColor: "#f2eecb", paddingTop: 50, height: layout.window.height - 90 }}>
                  <Text style={{
                     fontSize: layout.isSmallDevice ? 35 : 50, justifyContent: 'center',
                     alignItems: 'center',
                     alignSelf: 'center',
                  }} >PAUSE</Text>
                  <View style={styles.view} >
                     <TouchableHighlight style={styles.buttons} onPress={() => { this.setState({ visible: false }); }}>
                        <Text style={{ fontSize: layout.isSmallDevice ? 17 : 25 }}>Resume</Text>
                     </TouchableHighlight>

                     <TouchableHighlight style={styles.buttons} onPress={() => { this.setState({ visible: false }); this.props.create() }}>
                        <Text style={{ fontSize: layout.isSmallDevice ? 17 : 25 }}>Restart  {this.props.thirdTime > 4 ? '\n (ADS)' : ""}</Text>
                     </TouchableHighlight>

                     <TouchableHighlight style={styles.buttons} onPress={() => { this.setState({ visible: false }); this.props.destroy() }}>
                        <Text style={{ fontSize: layout.isSmallDevice ? 17 : 25 }}>Home  {this.props.thirdTime > 4 ? '\n (ADS)' : ""}</Text>
                     </TouchableHighlight>

                     {/* <TouchableHighlight style={styles.buttons} onPress={() => { this.setState({ visible: false }); this.props.destroy() }}>
                        <Text style={{ fontSize: layout.isSmallDevice ? 17 : 25 }}>Settings</Text>
                     </TouchableHighlight> */}
                  </View>
               </View>
            </Modal>
         </View >
      );
   }
}


const styles = StyleSheet.create({
   buttons: {
      backgroundColor: '#fff',
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
