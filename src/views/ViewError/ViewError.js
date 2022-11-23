import { Text, ImageBackground, View } from 'react-native'
import { stylesError } from "./ViewError.style"
import IconButton from '../../components/iconButton/IconButton';

const ViewError = ({ navigation }) => {
    
    return (
        <View style={stylesError.container}>
           <ImageBackground 
                 style={stylesError.image}
                source={require('../../../assets/error404.png')}
            />
           <IconButton onPress={() => navigation.navigate("CalculatorView") }/>
        </View>
    )
}

export default ViewError
