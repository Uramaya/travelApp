// import { ReduxProvider } from "@/stores/provider";
const homeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* <ReduxProvider> */}
                {children}
            {/* </ReduxProvider> */}
        </div>
    )
}

export default homeLayout