import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import Animation from './Animation';
import layout from '../constants/Layout';
import TextAnimations from './TextAnimations';

class DrawModalComponent extends React.Component {
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
               presentationStyle='overFullScreen'>
               <View style={{ backgroundColor: "#f2eecb", height: layout.window.height -90 }}>
                  <View style={{ flex: 1, flexDirection: 'column', marginBottom: 75 }}>
                     <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginLeft: layout.window.width / 3,
                        paddingBottom: 150
                     }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                           <Animation
                              length={layout.window.width / 3}
                              image={'o'}
                              max={this.props.max}
                              timing={1000}
                           />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                           <Animation
                              length={layout.window.width / 3}
                              image={'x'}
                              timing={1000}
                           />
                        </View>
                     </View>

                     <View style={{
                        flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
                     }}>
                        <TextAnimations size={75} text='DRAW' />
                        <View style={styles.buttonsContainer}>
                           <TouchableOpacity style={styles.leftButton} onPress={() => { this.setState({ visible: false }); this.props.create() }}>
                              <Text style={{ fontSize: 25 }}>Retry {this.props.thirdTime > 4 ? '\n (ADS)' : ""}</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.rightButton} onPress={() => { this.setState({ visible: false }); this.props.destroy() }}>
                              <Text style={{ fontSize: 25 }}>Home  {this.props.thirdTime > 4 ? '\n (ADS)' : ""}</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View >
               </View>
            </Modal>
         </View >
      );
   }
}


const styles = StyleSheet.create({
   buttonsContainer: {
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      margin: 25,
   },
   leftButton: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   rightButton: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   }
});

export default DrawModalComponent;
