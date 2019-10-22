import React from 'react';
import { ScrollView, Animated, View, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import layout from '../constants/Layout';
import {
   AdMobBanner,
   AdMobInterstitial,
   PublisherBanner,
   AdMobRewarded
} from 'expo-ads-admob'; import { FontAwesome } from '@expo/vector-icons';
import Item from '../components/Item';
import WinnerModalComponent from '../components/WinnerModal';
import PauseModalComponent from '../components/PauseModal';
import DrawModalComponent from '../components/DrawModal';
import Player from '../components/AI'

mapMoves = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
points = [];
refs = [];
max = 5;
disable = false;
pozitionsLeft = max * max;
thirdTime = 0;
winPositions = [];

class Game extends React.Component {
   static navigationOptions = {
      header: null,
   };
   x = true;
   modalWinner;
   modalPause;
   modalDraw;
   backHandler;
   refs = [];

   constructor(props) {
      super(props);
      this.animatedValue = new Animated.Value(0);
      this.animatedValueBorder = new Animated.Value(0);
      const { navigation } = props;

      this.state = {
         max: navigation.getParam('max', 3),
         numberCharsToWin: navigation.getParam('numberCharsToWin', 3),
         squareLength: navigation.getParam('squareLength', 50),
         pvp: navigation.getParam('pvp', false),
         ai: navigation.getParam('ai', false),
         ml: navigation.getParam('ml', false),
         computerMoveFirst: navigation.getParam('computerMoveFirst', false),
         zoomLevel: navigation.getParam('max', 3) >= 10 ? 1 : 3,
      };
      for (let i = 0; i < this.state.max; i++) {
         points[i] = [];
         points[i] = new Array(this.state.max).fill('')
         refs[i] = [];
         refs[i] = new Array(this.state.max)
      }
      this.modalWinner = React.createRef();
      this.modalPause = React.createRef();
      this.modalDraw = React.createRef();
   }

   componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
   }

   componentWillUnmount() {
      this.backHandler.remove()
   }

   handleBackPress = () => {
      return true;
   }

   getRows = (i) => {
      var columns = [];
      for (let j = 0; j < this.state.max; j++) {
         // if (this.state.max === 3) {
         //    refs[i][j] = React.createRef();
         //    columns.push((
         //       <Item key={i + j + Math.random()} ref={refs[i][j]} disable={this.getDisable} i={i} j={j} squareLength={this.state.squareLength} onPress={this.onPress} simbol={this.getSimbol} max={this.state.max}></Item>
         //    ))
         // } else {
         //    columns.push((
         //       <Item key={i + j + Math.random()} i={i} j={j} disable={this.getDisable} squareLength={this.state.squareLength} onPress={this.onPress} simbol={this.getSimbol} max={this.state.max}></Item>
         //    ))
         // }
         refs[i][j] = React.createRef();
         columns.push((
            <Item key={i + j + Math.random()}
               ref={refs[i][j]}
               disable={this.getDisable}
               i={i}
               j={j}
               squareLength={this.state.squareLength}
               onPress={this.onPress}
               simbol={this.getSimbol}
               max={this.state.max}
               point={points[i][j]}
            ></Item>
         ))
      }
      return columns;
   }

   getDisable() {
      return disable;
   }

   getSimbol = () => {
      return this.x ? 'x' : 'o';
   }

   onPress = (i, j, computer) => {
      if (points[i][j] || disable) return;
      disable = true;
      pozitionsLeft--;
      points[i][j] = this.x ? 'x' : 'o';
      var end = this.checkGameStatus(i, j);
      this.x = !this.x;
      if (!computer)
         this.computerTurn(i, j);
      else
         disable = false;
      if (end) disable = true;
   }

   computerTurn() {
      if (!this.state.pvp) {
         let p = new Player(this.state.numberCharsToWin, this.state.max);
         var index = p.minimax(JSON.parse(JSON.stringify(points)), this.getSimbol()).index;
         if (index) {
            setTimeout(() => {
               disable = false;
               refs[index.i][index.j].current.onPress(true);
            }, 300);
         }
      } else {
         disable = false;
      }
   }

   checkGameStatus(i, j) {
      if (this.checkHorizontal(i, j) || this.checkVertical(i, j) || this.checkHorizontalVertical(i, j) || this.checkVerticalHorizontal(i, j)) {
         winPositions.forEach((item) => {
            refs[item.i][item.j].current.onShowWin(points[item.i][item.j]);
         });
         setTimeout(() => { this.modalWinner.current.onPress(points[i][j]); }, 1000);
         return true;
      } else if (this.isTheEnd()) {
         this.modalDraw.current.onPress();
         return true;
      }
      return false;
   }

   checkVertical(i, j) {
      let status = { x: 0, o: 0 };
      var player = this.x ? 'x' : 'o';
      var z = i - this.state.numberCharsToWin, index = i + this.state.numberCharsToWin;
      for (z; z < index; z++) {
         if (z < 0 || z >= this.state.max) continue;
         if (points[z][j] === player) {
            status[player] += 1;
            winPositions.push({ i: z, j });
         } else {
            status[player] = 0;
            winPositions = [];
         }
         if (status[player] === this.state.numberCharsToWin) {
            return true;
         }
      }
      winPositions = [];
      return false;
   }

   checkHorizontal(i, j) {
      let status = { x: 0, o: 0 };
      var player = this.x ? 'x' : 'o';
      var z = j - this.state.numberCharsToWin, index = j + this.state.numberCharsToWin;

      for (z; z < index; z++) {
         if (z < 0 || z >= this.state.max) continue;

         if (points[i][z] === player) {
            status[player] += 1;
            winPositions.push({ i, j: z });
         } else {
            status[player] = 0;
            winPositions = [];
         }
         if (status[player] === this.state.numberCharsToWin) {
            return true;
         }
      }
      winPositions = [];

      return false;
   }

   checkHorizontalVertical(i, j) {
      let status = { x: 0, o: 0 }
      var player = this.x ? 'x' : 'o';
      var y = i - this.state.numberCharsToWin, indexy = i + this.state.numberCharsToWin;
      var z = j - this.state.numberCharsToWin, index = j + this.state.numberCharsToWin;

      for (z, y; z < index, y < indexy; z++ , y++) {
         if (z < 0 || y < 0 || z >= this.state.max || y >= this.state.max) continue;
         if (points[y][z] === player) {
            status[player] += 1;
            winPositions.push({ i: y, j: z });
         } else {
            status[player] = 0;
            winPositions = [];
         }
         if (status[player] === this.state.numberCharsToWin) {
            return true;
         }
      }
      winPositions = [];
      return false;
   }

   checkVerticalHorizontal(i, j) {
      let status = { x: 0, o: 0 }
      var player = this.x ? 'x' : 'o';
      var y = i + this.state.numberCharsToWin, indexy = i - this.state.numberCharsToWin;
      var z = j - this.state.numberCharsToWin, index = j + this.state.numberCharsToWin;

      for (y, z; y < indexy, z < index; y-- , z++) {
         if (z < 0 || y < 0 || z >= this.state.max || y >= this.state.max) continue;
         if (points[y][z] === player) {
            status[player] += 1;
            winPositions.push({ i: y, j: z });
         } else {
            status[player] = 0;
            winPositions = [];
         }
         if (status[player] === this.state.numberCharsToWin) {
            return true;
         }
      }
      winPositions = [];
      return false;
   }

   isTheEnd() {
      return pozitionsLeft === 0;
   }

   getZoomButtons() {
      return (<View>

      </View>)
   }

   getTemplate = () => {
      var template = [];
      for (let i = 0; i < this.state.max; i++) {
         template.push(
            (<View key={i} style={{
               flexDirection: 'row'
            }}>
               {this.getRows(i)}
            </View>)
         );
      }
      return template;
   }

   create = (value = this.state.max) => {
      thirdTime += 1;
      callback = () => {
         for (let i = 0; i < value; i++) {
            points[i] = [];
            points[i] = new Array(value).fill('')
         }

         this.x = true;
         disable = false;
         pozitionsLeft = value * value;

         this.setState({ max: value, ads: false }, () => {
            if (this.state.computerMoveFirst) {
               var random = Math.floor(Math.random() * mapMoves.length);
               refs[mapMoves[random][0]][mapMoves[random][1]].current.onPress(true);
            }
         })
      }
      if (thirdTime > 5) {
         this.setState({ ads: true })
         thirdTime = 0;
         AdMobInterstitial.setAdUnitID('ca-app-pub-7742191891392966/2923741733'); // Test ID, Replace with your-admob-unit-id
         AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true }).then(
            () => {
               AdMobInterstitial.showAdAsync().then(
                  () => {
                     callback();
                  }
               );
            }
         );
      } else {
         callback();
      }

   }

   setModalVisiblePause() {
      this.modalPause.current.onPress();
   }

   destroy = () => {
      thirdTime += 1;
      if (thirdTime > 5) {
         this.setState({ ads: true })
         thirdTime = 0;
         AdMobInterstitial.setAdUnitID('ca-app-pub-7742191891392966/2923741733'); // Test ID, Replace with your-admob-unit-id
         AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true }).then(
            () => {
               AdMobInterstitial.showAdAsync().then(
                  () => {
                     this.props.navigation.navigate('Links')
                     this.props.navigation.navigate('Home')
                  }
               );
            }
         );
      } else {
         thirdTime -= 1;
         this.props.navigation.navigate('Links')
         this.props.navigation.navigate('Home')
      }
   }

   getScrollView() {
      if (this.state.ads) {
         return (
            <View style={styles.loading}>
               <ActivityIndicator size={layout.window.width / 2} color="#0000ff" />
            </View>)
      } else {
         if (this.state.max >= 10) {
            return (<ScrollView style={[styles.container]} horizontal={true}>
               <ScrollView style={styles.container}>
                  <View style={{ flex: 1, padding: 150 }}>
                     {this.getTemplate()}
                  </View>
               </ScrollView >
            </ScrollView >)
         } else {
            return (
               <ScrollView style={styles.container}>
                  <View style={{ flex: 1, padding: 10, paddingBottom: 50, paddingTop: 150 }}>
                     {this.getTemplate()}
                  </View>
               </ScrollView >)
         }
      }
   }

   zoomIn() {
      let zoom = this.state.max >= 10 ? 3 : 7
      if (this.state.zoomLevel < 3)
         this.setState((oldState) => { return { squareLength: this.state.squareLength + zoom, zoomLevel: oldState.zoomLevel += 1 } })
   }

   zoomOut() {
      let zoom = this.state.max >= 10 ? 3 : 7
      if (this.state.zoomLevel > 0)
         this.setState((oldState) => { return { squareLength: this.state.squareLength - zoom, zoomLevel: oldState.zoomLevel -= 1 } })
   }

   render() {
      return (
         <View style={{ height: layout.window.height }}>
            <NavigationEvents
               onWillFocus={() => this.create()}
            />
            <View opacity={this.state.ads ? 0 : 0.35} style={styles.pauseButton}>
               <FontAwesome.Button name="pause-circle-o" backgroundColor="#f2eecb" onPress={() => this.setModalVisiblePause(true)} size={30} color="black">
               </FontAwesome.Button>
            </View>
            <View opacity={this.state.ads ? 0 : this.state.zoomLevel > 0 ? 0.35 : 0} style={styles.zoomButtonsMinus}>
               <FontAwesome.Button name="minus-square-o" backgroundColor="#f2eecb" onPress={() => this.zoomOut()} size={30} color="black">
               </FontAwesome.Button>
            </View>
            <View opacity={this.state.ads ? 0 : this.state.zoomLevel < 3 ? 0.35 : 0} style={styles.zoomButtons}>
               <FontAwesome.Button name="plus-square-o" backgroundColor="#f2eecb" onPress={() => this.zoomIn()} size={30} color="black">
               </FontAwesome.Button>
            </View>
            <View style={{ height: layout.window.height }}>
               {this.getScrollView()}
               <WinnerModalComponent max={this.state.max} thirdTime={thirdTime} ref={this.modalWinner} create={this.create} destroy={this.destroy} />
               <PauseModalComponent thirdTime={thirdTime} ref={this.modalPause} create={this.create} destroy={this.destroy} />
               <DrawModalComponent max={this.state.max} thirdTime={thirdTime} ref={this.modalDraw} create={this.create} destroy={this.destroy} />
            </View>
            <View style={styles.commercialButtom}>
               <AdMobBanner
                  bannerSize="smartBannerPortrait"
                  adUnitID="ca-app-pub-7742191891392966/7394497459"
                  onDidFailToReceiveAdWithError={
                     (error) => { console.log(error); }} />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#f2eecb',
      zIndex: 1,
   },
   patrat: {
      borderWidth: 0.75,
      borderColor: '#1f8eed',
   },
   commercialButtom: {
      position: 'absolute',
      bottom: 0,
      zIndex: 2
   },
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
   },
   pauseButton: {
      position: 'absolute',
      zIndex: 2,
      top: 50,
      right: 10,
   },
   zoomButtonsMinus: {
      position: 'absolute',
      zIndex: 2,
      top: 50,
      left: 50,
   },
   zoomButtons: {
      position: 'absolute',
      zIndex: 2,
      top: 50,
      left: 5,
   },
   buttons: {
      backgroundColor: '#fff',
      padding: 5,
      margin: 25,
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
      flexDirection: 'column',
   },
   loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
   }
});

export default Game;