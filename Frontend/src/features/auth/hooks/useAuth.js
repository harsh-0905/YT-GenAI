import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { InterviewContext } from "../../interview/interview.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    // Access interview context to clear data on logout
    const { setReports, setReport } = useContext(InterviewContext)

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data?.user) {
                setUser(data.user)
            }
        } catch (err) {
            console.error("Login failed:", err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data?.user) {
                setUser(data.user)
            }
        } catch (err) {
            console.error("Register failed:", err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            // ✅ Clear interview data on logout
            setReports([])
            setReport(null)
        } catch (err) {
            console.error("Logout failed:", err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                if (data?.user) {
                    setUser(data.user)
                }
            } catch (err) {
                console.error("Session check failed:", err.message)
            } finally {
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}