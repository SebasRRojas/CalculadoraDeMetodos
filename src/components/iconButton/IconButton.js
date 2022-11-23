import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons';

import { styles } from './IconButton.style'


const IconButton = ({
  backgroundColor = "#000",
  color = "#FFF",
  onPress = () => {},

  //Custom styles
  buttonStyle
}) => {

  const buttonStyles = Object.assign({...styles.container},{...buttonStyle})

  return (
    <TouchableOpacity
      style={{ ...buttonStyles, backgroundColor: backgroundColor }}
      onPress={onPress}
      activeOpacity={0.7}
    >
        <Icon name='arrow-back' size={40} color={color}></Icon>
    </TouchableOpacity>
  )
}

export default IconButton
