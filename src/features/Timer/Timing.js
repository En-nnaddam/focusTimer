import { View, StyleSheet } from "react-native";
import RoundedButton from "../../components/RoundedButton";
import { memo } from "react";
import { spacing } from "../../utils/sizes";

const Timing = ({ style = {}, changeTime }) => {
    return (
        <View style={[styles.container, style]}>
            <RoundedButton
                size={75}
                title="10"
                onPress={() => changeTime(10)}
            />
            <RoundedButton
                size={75}
                title="15"
                onPress={() => changeTime(15)}
            />
            <RoundedButton
                size={75}
                title="20"
                onPress={() => changeTime(20)}
            />
        </View>
    )
}

export default memo(Timing);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
})