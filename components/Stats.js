import React from "react";
import { View, Text, StyleSheet } from "react-native";

import normalize from "../components/normalize";
import Storage from "../components/Storage";
import layout from "../constants/Layout";

class StatsComponent extends React.Component {
  state = {};

  componentWillReceiveProps(props) {
    var storage = new Storage();

    storage
      .getStats(props.level)
      .then((data) => {
        this.setState({ ...data });
      })
      .catch(console.error);
  }

  render() {
    const { fontColor, backgroundColor } = this.props.theme;
    return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View style={styles.view}>
          <View
            style={{
              width: layout.window.width / 3 - 10,
              flexDirection: "column",
            }}
          >
            <Text
              style={[
                styles.text,
                { color: fontColor, backgroundColor: backgroundColor },
              ]}
            >
              Player
            </Text>
            <Text
              style={[
                styles.text,
                { color: fontColor, backgroundColor: backgroundColor },
              ]}
            >
              {this.state.player}
            </Text>
          </View>

          <View
            style={{
              width: layout.window.width / 3 - 10,
              flexDirection: "column",
            }}
          >
            <Text
              style={[
                styles.text,
                { color: fontColor, backgroundColor: backgroundColor },
              ]}
            >
              Draw
            </Text>
            <Text
              style={[
                styles.text,
                { color: fontColor, backgroundColor: backgroundColor },
              ]}
            >
              {this.state.draw}
            </Text>
          </View>

          <View
            style={{
              width: layout.window.width / 3 - 10,
              flexDirection: "column",
            }}
          >
            <Text
              style={[
                styles.text,
                { color: fontColor, backgroundColor: backgroundColor },
              ]}
            >
              Computer
            </Text>
            <Text
              style={[
                styles.text,
                { color: fontColor, backgroundColor: backgroundColor },
              ]}
            >
              {this.state.computer}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: normalize(20),
    width: layout.window.width / 3 - 10,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: layout.window.width - 50,
  },
});

export default StatsComponent;
