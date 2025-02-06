import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserDataType, UserType } from "@/types";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [user, setUser] = useState<UserType>(null)
    const router = useRouter()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser?.uid,
                    email: firebaseUser?.email,
                    name: firebaseUser?.displayName,
                })
                router.replace('/(tabs)')
            } else {
                //user not exist
                setUser(null)
                router.replace('/(auth)/welcome')
            }
        })
        return () => unsub()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error: any) {
            let msg = error.message;
            return { success: true, msg }
        }
    }
    const register = async (name: string, email: string, password: string) => {
        try {
            console.log("Register", name, email, password)
            let response = await createUserWithEmailAndPassword(auth, email, password)
            console.log("RegisterA", response)
            let res = await setDoc(doc(firestore, 'user', response.user.uid), {
                name,
                email,
                uid: response.user.uid
            })
            console.log("RegisterADfdf", res)
            return { success: true }
        } catch (error: any) {
            let msg = error.message;
            console.log('createEmaildlfdf', msg)
            return { success: false, msg }
        }
    }
    const updateUserData = async (uid: string) => {
        try {
            let docRef = doc(firestore, 'user', uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                let data = docSnap.data()
                const userData: UserType = {
                    uid: data?.uid,
                    name: data.name || null,
                    email: data.email || null,
                    image: data.image || null
                }
                setUser({ ...userData })
            }
            return { success: true }
        } catch (error: any) {
            let msg = error.message;
            return { success: true, msg }
        }
    }
    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be wrraped inside AuthProvider")
    }
    return context
}

