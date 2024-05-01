import { ReduxProvider } from "@/stores/provider";
const myPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            this is about the my page layout
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </div>
    )
}

export default myPageLayout