import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import LinksScreen from "../screens/LinksScreen";
import Game from "../screens/Gane";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    Game: Game,
  },
  Platform.select({
    web: { headerMode: "screen" },
    default: {},
  })
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarOptions: { style: { display: "none" } },
};

LinksStack.path = "";

const tabNavigator = createBottomTabNavigator({
  LinksStack,
});

tabNavigator.path = "";

export default tabNavigator;
