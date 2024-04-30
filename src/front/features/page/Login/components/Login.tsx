"use client"
import { useState } from "react"
import { logIn, logOut } from "@/stores/auth/auth"
import { AppDispatch, useAppSelector } from "@/stores/store"
import { Button } from "@mui/material"
import { useDispatch } from "react-redux"

const Login = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch<AppDispatch>()
    const loginUserName = useAppSelector((state) => state.authReducer.value.username)
    const onClickLogIn = () => {
        dispatch(logIn(username))
    }
    const onClickLogOut = () => {
        dispatch(logOut())
        setUsername("")
    }
    return (
        <>
            {/* Ths is an example code */}
            <div>login page</div>
            <input type="text" onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={onClickLogIn}>Log in </Button>
            <Button onClick={onClickLogOut}>Log out </Button>
            <h1>Username: {loginUserName}</h1>
        </>
    )
}

export default Login