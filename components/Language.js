import React from 'react';
import { Text } from 'react-native';
import languageJSON from '../constants/language.json';

function Language(props) {
   console.log(props,languageJSON[props.text])
   return (
      <Text>
         {languageJSON[props.text][props.lang]}
      </Text>
   );
}

export default Language;
