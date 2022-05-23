import { View, Text, StyleSheet, Vibration } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import CountDown from '../../components/CountDown';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import RoundedButton from '../../components/RoundedButton';
import { ProgressBar } from "react-native-paper";
import Timing from './Timing';

const DEFAULT_MINUTES = 10

function Timer({ focusSubject, onTimeEnd, onCancel }) {
    const [minutes, setMinutes] = useState(DEFAULT_MINUTES)
    const [isPaused, setIsPaused] = useState(true)
    const [progress, setProgress] = useState(1)
    const status = isPaused ? 'Start' : "Pause"

    const handelPress = () => {
        setIsPaused(currValue => !currValue)
    }

    const onProgress = (progress) => {
        setProgress(progress)
    }

    const changeTime = useCallback((min) => {
        setMinutes(min)
        setProgress(1)
        setIsPaused(true)
    }, [])

    const onEnd = () => {
        Vibration.vibrate()
        setMinutes(DEFAULT_MINUTES)
        setProgress(1)
        setIsPaused(true)
        onTimeEnd()
    }

    const CancelButton = useMemo(
        () => (
            <View style={styles.cancelSubject}>
                {console.log("Cancel ...")}
                <RoundedButton
                    size={50}
                    title='-'
                    onPress={onCancel}
                />
            </View>
        ), []
    )

    const StartButton = useMemo(
        () => (
            <View style={styles.buttonWrapper}>
                <RoundedButton
                    size={100}
                    title={status}
                    onPress={handelPress}
                />
            </View>
        ), []
    )

    return (
        <View style={styles.container}>
            <View style={styles.countDown}>
                <CountDown
                    minutes={minutes}
                    isPaused={isPaused}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View style={styles.taskContainer}>
                <Text style={styles.title}>Focusing on :</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.progressContainer}>
                <ProgressBar
                    color={colors.purple}
                    progress={progress}
                    style={styles.progress}
                />
            </View>
            <Timing changeTime={changeTime} style={styles.timing} />
            {StartButton}
            {CancelButton}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: "center",
        fontSize: fontSizes.md,
    },
    task: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: fontSizes.md,
    },
    taskContainer: {
        marginTop: spacing.lg
    },
    buttonWrapper: {
        marginTop: spacing.lg,
        alignItems: 'center',
    },
    countDown: {
        flex: 0.5,
    },
    progressContainer: {
        paddingTop: spacing.md
    },
    progress: {
        height: 16,
    },
    timing: {
        marginTop: spacing.md
    },
    cancelSubject: {
        position: 'absolute',
        left: spacing.md,
        bottom: spacing.md,
    }
})

export default Timer;