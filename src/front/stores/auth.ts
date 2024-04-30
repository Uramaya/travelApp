import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialState } from "@/types"

const initialState: InitialState = {
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
        logOut: ():InitialState => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<string>): InitialState => {
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