import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animation from '../components/Animation';
import layout from '../constants/Layout';

class Item extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         squareLength: props.squareLength,
         simbol: props.point
      };
   }
   repeted = 0;
   onPress(computer, skip) {
      if (this.props.disable()) return;
      this.setState({ simbol: this.props.simbol() })
      if (!skip) this.props.onPress(this.props.i, this.props.j, computer);
   }

   onShowWin(simbol) {
      this.setState({ simbol: '' }, () => {
         this.setState({ simbol }, () => {
            setTimeout(() => {
               this.repeted += 1;
               if (this.repeted < 3)
                  this.onShowWin(simbol);
               else
                  this.repeted = 0;
            }, 500);
         })
      })
   }

   render() {
      return (
         <View>
            <View key={this.props.i} style={{ flexDirection: 'row' }}>
               <View key={this.props.j} style={{
                  width: this.state.squareLength,
                  height: this.state.squareLength,
                  borderRightWidth: this.props.j === this.props.max - 1 ? 0 : 0.75,
                  borderBottomWidth: this.props.i === this.props.max - 1 ? 0 : 0.75,
                  borderColor: '#1f8eed',
               }}>
                  <TouchableOpacity style={{
                     width: this.state.squareLength,
                     height: this.state.squareLength
                  }} onPress={() => { this.onPress() }}>
                     {this.state.simbol ?
                        <Animation
                           max={this.props.max}
                           length={this.state.squareLength}
                           image={this.state.simbol}
                           timing={layout.isSmallDevice ? 1 : false}
                        />
                        : <View></View>}
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}

export default Item;
