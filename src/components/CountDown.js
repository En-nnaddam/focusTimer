import { StyleSheet, Text } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
const minutesToMillis = (min) => min * 1000 * 60
const timeFormat = (time) => time < 10 ? `0${time}` : time

function CountDown({
    minutes = 0.5,
    isPaused = true,
    onProgress,
    onEnd,
}) {
    const interval = useRef(null);
    const [millis, setMillis] = useState(minutesToMillis(minutes))
    const minute = Math.floor(millis / 1000 / 60)
    const seconds = Math.floor(millis / 1000 % 60)

    const countDown = () => {
        setMillis(millis => {
            if (millis === 0) {
                clearInterval(interval)
                return millis
            }
            const timeLeft = millis - 1000
            return timeLeft
        })
    }

    useEffect(() => {
        setMillis(minutesToMillis(minutes))
    }, [minutes])

    useEffect(() => {
        if (!isPaused)
            interval.current = setInterval(countDown, 1000)
        return () => clearInterval(interval.current)
    }, [isPaused])

    useEffect(() => {
        if(millis === 0) return onEnd()
        onProgress(millis / minutesToMillis(minutes))
    }, [millis])

    return (
        <Text style={styles.text}>
            {timeFormat(minute)}:{timeFormat(seconds)}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl,
        fontWeight: 'bold',
        padding: spacing.lg,
        backgroundColor: colors.purple,
        color: colors.white,
        textAlign: "center",
    }
})

export default CountDown;