import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import { colors, spacingX, spacingY } from '@/constants/theme'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("")
    const [isLoading, setIsloading] = useState(false);

    const handleLogin = () => {
        if (!emailRef.current && !passwordRef.current) {
            Alert.alert("Login", "Please fill all the field")
            return
        }
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View>
                    <BackButton />
                </View>
                <View>
                    <Typo size={30} fontWeight='800'>
                        Hey
                    </Typo>
                    <Typo size={30} fontWeight='800'>
                        Welcome back
                    </Typo>
                </View>
                {/* login form */}
                <View style={styles.form}>
                    <Typo size={16} color={colors.textLighter} >Login now to track all your expenses</Typo>
                    {/*email input */}
                    <Input
                        placeholder="etner your email"
                        icon={<Icons.At size={verticalScale(26)} color={colors.neutral300} weight='fill' />}
                        onChangeText={(value) => emailRef.current = value}
                    />
                    <Input
                        placeholder="etner your email"
                        icon={<Icons.Lock size={verticalScale(26)} color={colors.neutral300} weight='fill' />}
                        onChangeText={(value) => passwordRef.current = value}
                    />
                    <Typo style={{ alignSelf: 'flex-end' }} size={14} color={colors.text}>
                        Forgot Password
                    </Typo>
                    <Button loading={isLoading} onPress={handleLogin}>
                        <Typo
                            fontWeight={'700'}
                            color={colors.black}
                            size={17}
                        >
                            Login
                        </Typo>
                    </Button>
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <Typo size={15}>Don't have account?</Typo>
                    <Pressable onPress={() => router.push('/(auth)/register')}>
                        <Typo size={15} fontWeight={'700'} color={colors.primary}>Sign Up</Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20
    },
    form: {
        gap: spacingY._20
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }

})