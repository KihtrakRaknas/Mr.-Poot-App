import React from 'react';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import { WebView } from 'react-native-webview';
import { ListItem } from 'react-native-elements'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
var json = require('./pootData.json');

 class App extends React.Component{
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    title: 'Mr. Poot',
  };
  
   render(){
     var items = [];
     var i = 0;
     var srcImg = require('./assets/one.png')
      for(let unit in json){
        i++;
        if(i==2)
          srcImg = require('./assets/two.png')
        if(i==3)
          srcImg = require('./assets/three.png')
        if(i==4)
          srcImg = require('./assets/four.png')
        if(i==5)
          srcImg = require('./assets/five.png')
        if(i==6)
          srcImg = require('./assets/six.png')
        if(i==7)
          srcImg = require('./assets/seven.png')
        if(i==8)
          srcImg = require('./assets/eight.png')
        if(i==9)
          srcImg = require('./assets/nine.png')
        items.push(
        <ListItem
          key={unit}
          style={{width:"100%"}}
          leftAvatar={{ source: srcImg }}
          title={unit}
          bottomDivider
          topDivider
          onPress={()=>{
            let tempUnit  = unit;
            console.log(tempUnit);
            this.props.navigation.navigate('subUnits',{subUnits:json[tempUnit], title: tempUnit})
          }}
        />)
        
      }
      return (
        <ScrollView>
          {items}
        </ScrollView>
      );
   }

}

class subUnits extends React.Component{
  constructor(props){
    super(props);
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'TITLE'),
    };
  };

   render(){
     var items = [];
     var srcImg = require('./assets/one.png')
     var subUnits = this.props.navigation.getParam('subUnits',{})
      for(let unit in subUnits){
        items.push(
        <ListItem
          key={unit}
          style={{width:"100%"}}
          title={unit}
          bottomDivider
          topDivider
          onPress={()=>{
            let tempUnit  = unit;
            console.log(tempUnit);
            this.props.navigation.navigate('info',{info:subUnits[tempUnit], title:tempUnit})
          }}
        />)
        
      }
      return (
        <ScrollView>
          {items}
        </ScrollView>
      );
   }

}

class info extends React.Component{
  constructor(props){
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'TITLE'),
    };
  };
  
   render(){
     var items = [];
     var info = this.props.navigation.getParam('info',[])
     //console.log(info)
     var totalHTML = `<head>
      <style>
        h2{
          font-size:300%;
        }
        iframe{
          width:100%;
          height:50%;
        }
        .yaqOZd{
          border-style: none none dotted none;
          border-width:2px;
          border-radius:200px;
          border-color: blue;
        }
        path{
          display:none;
        }
      </style>
     </head><div style="font-size:300%;padding:20px;">`
      for(thing of info){
        totalHTML += thing;
      }
      totalHTML += "<div>";
      return (
        <View style={{ flex: 1}}>
          <WebView
            //originWhitelist={['*']}
            source={{ html: totalHTML }}
            style={{flex:1, width:"100%"}}
            mixedContentMode="always" 
            //bounces={false}
            //contentInset={{top: 10, left: 10, bottom: 10, right: 10}}
            allowUniversalAccessFromFileURLs={true}
          />
        </View>
      );
   }

}

const HomeStack = createStackNavigator({
  Home: { screen: App},
  subUnits:{ screen: subUnits},
  info: { screen: info},
});

export default createAppContainer(HomeStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
