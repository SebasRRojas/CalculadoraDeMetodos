import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from './Button.style'


const Button = ({
  children,
  backgroundColor = "#FFF",
  color = "#000",
  onPress = () => { },

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
      <Text style={{ ...styles.text, color: color }}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button
