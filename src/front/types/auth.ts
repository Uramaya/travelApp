export interface InitialState {
    value: AuthState;
}

export interface AuthState {
    isAuth: boolean
    username: string
    uid: string
}