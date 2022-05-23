import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";
import { STATUSES } from "../../utils/status";

const FocusHistory = ({
    history = [],
    setFocusSubject,
    style = {}
}) => {

    const focusOn = (item) => {
        if (item.status === STATUSES.COMPLETED) return

        setFocusSubject(item.subject)
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => focusOn(item)}>
                <View style={styles.itemContainer(item.status)}>
                    <Text style={styles.item}>{item.subject}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={style}>
            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemContainer: (status) => ({
        padding: spacing.sm,
        marginBottom: spacing.sm,
        backgroundColor: status === STATUSES.COMPLETED ? colors.darkPurple : colors.purple,
        borderWidth: 2,
        borderColor: colors.white,
        opacity: status === STATUSES.COMPLETED ? 0.5 : 1,
    }),
    item: {
        fontSize: fontSizes.md,
        color: colors.white,
        textAlign: "center",
    }
})

export default FocusHistory;