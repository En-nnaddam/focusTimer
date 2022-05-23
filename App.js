import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View, NativeModules } from 'react-native';
import Focus from './src/features/Focus/Focus';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';
import Timer from './src/features/Timer/Timer';
import FocusHistory from './src/features/Focus/FocusHistory';
import RoundedButton from './src/components/RoundedButton';
const { StatusBarManager } = NativeModules;
import uniqueid from "lodash.uniqueid";

const STATUSES = {
  COMPLETED: 1,
  CANCLED: 2,
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null)
  const [subjectsHistory, setSubjectsHistory] = useState([])

  const cancelSubject = () => {
    addSubjectToHistory(focusSubject, STATUSES.CANCLED)
    setFocusSubject(null)
  }

  const addSubjectToHistory = (subject, status) => {
    setSubjectsHistory([...subjectsHistory, { key: uniqueid("subject_"), subject, status }])
  }

  const onTimeEnd = () => {
    addSubjectToHistory(focusSubject, STATUSES.COMPLETED)
    setFocusSubject(null)
  }

  const getSubjectsHistoryFromStore = async () => {
    try {
      const subjects = await AsyncStorage.getItem('subjectsHistory')
      setSubjectsHistory(JSON.parse(subjects))
    } catch (error) {
      console.log("Storage Error", error.message)
    }
  }

  const clearSubjectsHistory = () => {
    setSubjectsHistory([])
  }

  const setSubjectsHistoryToStore = async () => {
    try {
      await AsyncStorage.setItem('subjectsHistory', JSON.stringify(subjectsHistory))
    } catch (error) {
      console.log("Storage Error", error.message)
    }
  }

  useEffect(() => {
    getSubjectsHistoryFromStore()
  }, [])

  useEffect(() => {
    setSubjectsHistoryToStore()
  }, [subjectsHistory])

  return (
    <View style={styles.container}>
      {
        focusSubject
          ? <Timer
            focusSubject={focusSubject}
            onTimeEnd={onTimeEnd}
            onCancel={cancelSubject}
          />
          : (
            <>
              <Focus style={styles.focus} addSubject={setFocusSubject} />
              <FocusHistory
                history={subjectsHistory}
                setFocusSubject={setFocusSubject}
                style={styles.focusHistory}
              />
              <View style={styles.clear}>
                <RoundedButton
                  title={"clear"}
                  size={100}
                  onPress={clearSubjectsHistory}
                />
              </View>
            </>
          )
      }
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkPurple,
    padding: spacing.sm,
    paddingTop: Platform.OS === 'ios'
      ? spacing.md
      : StatusBarManager.HEIGHT,
  },
  text: {
    color: colors.white
  },
  clear: {
    alignItems: "center",
    paddingTop: spacing.sm,
  },
  focus: {
    flex: 1,
  },
  focusHistory: {
    flex: 1,
  }
});
