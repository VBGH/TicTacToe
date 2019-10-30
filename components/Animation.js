
import React, { Component } from 'react'
import { Animated, View, Easing } from 'react-native'

class Animation extends Component {
   stas = true;
   constructor(props) {
      super(props)
      this.state = {
         length: props.length,
         image: props.image,
         timing: props.timing || 200,
         textAnimations: props.textAnimations
      }
      this.animatedValue = new Animated.Value(0);
      this.animatedValueBorder = new Animated.Value(0);
      this.animatedValueColor = new Animated.Value(0);

   }

   getSign = () => {
      if (this.state.image === 'x') {
         Animated.timing(this.animatedValue, {
            toValue: this.state.length,
            duration: this.state.timing,
            easing: Easing.bezier(0, 1.76, .55, -0.83)
         }).start()
         Animated.timing(this.animatedValueBorder, {
            toValue: 2,
            duration: this.state.timing,
            easing: Easing.bezier(0, 1.76, .55, -0.83)
         }).start()
      } else {
         Animated.timing(this.animatedValue, {
            toValue: this.state.length - 20 + this.props.max,
            duration: this.state.timing,
            easing: Easing.bezier(0, 1.76, .55, -0.83)
         }).start()
         Animated.timing(this.animatedValueBorder, {
            toValue: 3,
            duration: this.state.timing,
            easing: Easing.bezier(0, 1.76, .55, -0.83)
         }).start()
      }
      Animated.timing(this.animatedValueColor, {
         toValue: 100,
         duration: 9000,
      }).start()
   }

   getTemplateSign() {
      const { colors: { x, o } } = this.props;

      if (this.state.image === 'x' || this.state.image === 'X') {
         return (
            <View style={{
               justifyContent: 'center',
               alignItems: 'center',
               textAlignVertical: 'center',
               textAlign: 'center',
               position: 'relative'
            }}>
               <Animated.View
                  style={{
                     borderWidth: this.animatedValueBorder,
                     borderRadius: 1,
                     width: 1,
                     height: this.animatedValue,
                     position: 'absolute',
                     opacity: this.props.image === 'X' || this.props.image === 'O' ? 0.1 : 1,
                     borderColor: this.state.textAnimations ? this.animatedValueColor.interpolate({
                        inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        outputRange: [x, o, x, o, x, o, x, o, x, o, x]
                     }) : x,
                     transform: [
                        {
                           translateY: this.animatedValue.interpolate({
                              inputRange: [1, 1],
                              outputRange: [1, this.state.length / 2]
                           }),
                        },
                        {
                           rotate: '45deg'
                        }
                     ]
                  }}

               />
               <Animated.View
                  style={{
                     borderWidth: this.animatedValueBorder,
                     borderRadius: 1,
                     width: this.animatedValue,
                     position: 'absolute',
                     opacity: this.props.image === 'X' || this.props.image === 'O' ? 0.1 : 1,
                     borderColor: this.state.textAnimations ? this.animatedValueColor.interpolate({
                        inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        outputRange: [x, o, x, o, x, o, x, o, x, o, x]
                     }) : x,
                     transform: [
                        {
                           translateY: this.animatedValue.interpolate({
                              inputRange: [1, 1],
                              outputRange: [1, this.state.length / 2]
                           }),
                        },
                        {
                           rotate: '45deg'
                        }
                     ]
                  }
                  } />
            </View>
         );
      } else {
         return (
            <View style={{
               justifyContent: 'center',
               alignItems: 'center',
               textAlignVertical: 'center',
               textAlign: 'center',
               position: 'relative'
            }}>
               <Animated.View
                  style={{
                     borderWidth: this.animatedValueBorder,
                     borderRadius: this.animatedValue,
                     opacity: this.props.image === 'X' || this.props.image === 'O' ? 0.5 : 1,
                     borderColor: this.state.textAnimations ? this.animatedValueColor.interpolate({
                        inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        outputRange: [x, o, x, o, x, o, x, o, x, o, x]
                     }) : o,
                     width: this.animatedValue,
                     height: this.animatedValue,
                     position: 'absolute',
                     transform: [
                        {
                           translateY: this.animatedValue.interpolate({
                              inputRange: [1, 1],
                              outputRange: [1, this.state.length / 2]
                           })
                        }
                     ]
                  }}
               />
            </View>
         )
      }
   }

   render() {
      this.getSign();
      return this.getTemplateSign();
   }
}

export default Animation;