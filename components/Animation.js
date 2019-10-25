
import React, { Component } from 'react'
import { Animated, View, Easing } from 'react-native'

class Animation extends Component {
   stas = true;
   constructor(props) {
      super(props)
      this.state = {
         length: props.length,
         image: props.image,
         timing: props.timing || 200
      }
      this.animatedValue = new Animated.Value(0);
      this.animatedValueBorder = new Animated.Value(0);

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

   }

   getTemplateSign() {
      if (this.state.image === 'x') {
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
                     borderRadius:1,
                     width: 1,
                     height: this.animatedValue,
                     position: 'absolute',
                     borderColor: 'blue',
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
                     borderRadius:1,
                     width: this.animatedValue,
                     position: 'absolute',
                     borderColor: 'blue',
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
                     borderColor: 'red',
                     width: this.animatedValue,
                     height: this.animatedValue,
                     position: 'absolute',
                     transform: [
                        {
                           translateY: this.animatedValue.interpolate({
                              inputRange: [1, 1],
                              outputRange: [1, this.state.length / 2]
                           }),
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