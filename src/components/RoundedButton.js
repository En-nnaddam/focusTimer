import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes } from "../utils/sizes";

function RoundedButton(
    {
        style = {},
        textStyle = {},
        size = 125,
        title = '',
        onPress= null
    }
) {
    return (
        <TouchableOpacity
            style={[styles(size).button, style]}
            onPress={onPress}
        >
            <Text style={[styles(size).text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

export default RoundedButton;

const styles = (size = 125) => StyleSheet.create({
    button: {
        borderRadius: size / 2,
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.white
    },
    text: {
        fontSize: size/3,
        color: colors.white,
    }
})