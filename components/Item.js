import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animation from '../components/Animation';
import layout from '../constants/Layout';

class Item extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         squareLength: props.squareLength,
         simbol: props.point,
      };
   }
   repeted = 0;

   onPress() {
      if (this.props.disable()) return;
      var simbol = this.props.simbol(), process = false;

      if (this.state.simbol === '' && this.props.dClick) {
         this.setState({ simbol: simbol.toUpperCase() })
         process = true;
      } else
         this.setState({ simbol: simbol })

      this.props.onPress(this.props.i, this.props.j, process);
   }

   computerMove() {
      this.setState({ simbol: this.props.simbol() })
      this.props.computerMove(this.props.i, this.props.j);
   }

   onShowWin(simbol) {
      this.setState({ simbol: '' }, () => {
         this.setState({ simbol, wins: true });
      })
   }

   removeSimbol() {
      this.setState({ simbol: '' });
   }

   render() {
      var { pieces, fontColor } = this.props.theme;
      return (
         <View>
            <View key={this.props.i} style={{ flexDirection: 'row' }}>
               <View key={this.props.j} style={{
                  width: this.state.squareLength,
                  height: this.state.squareLength,
                  borderRightWidth: this.props.j === this.props.max - 1 ? 0 : 0.75,
                  borderBottomWidth: this.props.i === this.props.max - 1 ? 0 : 0.75,
                  borderColor: fontColor,
               }}>
                  <TouchableOpacity style={{
                     width: this.state.squareLength,
                     height: this.state.squareLength,
                  }} onPress={() => { this.onPress() }}>
                     {this.state.simbol ?
                        <Animation
                           max={this.props.max}
                           length={this.state.squareLength}
                           image={this.state.simbol}
                           timing={layout.isSmallDevice ? 1 : false}
                           textAnimations={this.state.wins}
                           colors={pieces}
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
