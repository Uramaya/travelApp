import { ReduxProvider } from "@/stores/provider";
const loginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            this is about the login layout
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </div>
    )
}

export default loginLayout