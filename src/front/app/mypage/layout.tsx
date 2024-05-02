import { ReduxProvider } from "@/stores/provider";
const myPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </div>
    )
}

export default myPageLayout