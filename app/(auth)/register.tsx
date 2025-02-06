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
import { useAuth } from '@/contexts/authContext'

const Register = () => {
    const router = useRouter();
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("")
    const [isLoading, setIsloading] = useState(false);
    const { register: UserRegister } = useAuth()

    const handleLogin = async () => {
        if (!emailRef.current && !passwordRef.current) {
            Alert.alert("Login", "Please fill all the field")
            return
        }
        setIsloading(true)
        const res = await UserRegister(nameRef.current, emailRef.current, passwordRef.current)
        console.log('response', res)
        setIsloading(false)
        if (!res.success) {
            Alert.alert('Sign Up', res.msg)
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
                        Let's
                    </Typo>
                    <Typo size={30} fontWeight='800'>
                        Get Started
                    </Typo>
                </View>
                {/* login form */}
                <View style={styles.form}>
                    <Typo size={16} color={colors.textLighter} >Login now to track all your expenses</Typo>
                    {/*email input */}
                    <Input
                        placeholder="Etner your name"
                        icon={<Icons.At size={verticalScale(26)} color={colors.neutral300} weight='fill' />}
                        onChangeText={(value) => nameRef.current = value}
                    />
                    <Input
                        placeholder="Etner your email"
                        icon={<Icons.At size={verticalScale(26)} color={colors.neutral300} weight='fill' />}
                        onChangeText={(value) => emailRef.current = value}
                    />
                    <Input
                        placeholder="Etner your email"
                        icon={<Icons.Lock size={verticalScale(26)} color={colors.neutral300} weight='fill' />}
                        onChangeText={(value) => passwordRef.current = value}
                    />
                    <Button loading={isLoading} onPress={handleLogin}>
                        <Typo
                            fontWeight={'700'}
                            color={colors.black}
                            size={17}
                        >
                            Signup
                        </Typo>
                    </Button>
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <Typo size={15}>Don't have account?</Typo>
                    <Pressable onPress={() => router.push('/(auth)/register')}>
                        <Typo size={15} fontWeight={'700'} color={colors.primary}>Login</Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Register

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