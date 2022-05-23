import { StyleSheet, Text, View } from "react-native"
import { TextInput } from "react-native-paper"
import { useState } from "react"
import RoundedButton from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";

function Focus({ addSubject, style  }) {
    const [subject, setSubject] = useState(null)

    const handelSubmitEditing = ({ nativeEvent }) => {
        setSubject(nativeEvent.text)
    }

    const handelPress = () => {
        addSubject(subject)
    }

    return (
        <View style={style}>
            <Text style={styles.title}>What would you like to focus on ?</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onSubmitEditing={handelSubmitEditing}
                />
                <RoundedButton title="+" size={50} onPress={handelPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: fontSizes.lg,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    textInput: {
        flex: 1,
        marginRight: spacing.sm,
    }
})
export default Focus;