import React, { Component } from "react";
import { Animated, View, Easing } from "react-native";

class TextAnimations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: props.size,
      timing: props.timing || 300,
      text: props.text,
    };
    this.animatedValue = new Animated.Value(0);
    this.animatedValueColor = new Animated.Value(0);
  }

  startAnimation = () => {
    Animated.timing(this.animatedValue, {
      useNativeDriver: false,
      toValue: this.state.size,
      duration: this.state.timing,
      easing: Easing.bounce,
    }).start();
    Animated.timing(this.animatedValueColor, {
      useNativeDriver: false,
      toValue: 100,
      duration: 10000,
    }).start();
  };

  getTemplate() {
    const {
      colors: { x, o },
    } = this.props;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlignVertical: "center",
          textAlign: "center",
        }}
      >
        <Animated.Text
          style={{
            fontSize: this.animatedValue,
            color: this.animatedValueColor.interpolate({
              inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
              outputRange: [x, o, x, o, x, o, x, o, x, o, x],
            }),
          }}
        >
          {this.state.text}
        </Animated.Text>
      </View>
    );
  }

  render() {
    this.startAnimation();
    return this.getTemplate();
  }
}

export default TextAnimations;
