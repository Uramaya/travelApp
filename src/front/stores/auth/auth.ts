import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type initialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean
    username: string
    uid: string
}
const initialState: initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: "",
    }
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: ():initialState => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<string>): initialState => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    uid: "",
                }
            }
        },
    },
})

export const { logIn, logOut } = auth.actions
export default auth.reducer