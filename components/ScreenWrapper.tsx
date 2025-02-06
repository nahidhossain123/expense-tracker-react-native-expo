import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { colors } from '@/constants/theme'
const { width } = Dimensions.get('window')
const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    const paddingTop = Platform.OS == 'ios' ? width * 0.06 : 50
    return (
        <View style={[
            {
                paddingTop,
                flex: 1,
                backgroundColor: colors.neutral900,
            },
            style
        ]}>
            <StatusBar barStyle={'light-content'} />
            {children}
        </View>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({})