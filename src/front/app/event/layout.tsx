"use client"
// import { ReduxProvider } from "@/stores/provider"
import '@/styles/Root.scss'
const myEventLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="root-content-wrapper">
            {/* <ReduxProvider> */}
                {children}
            {/* </ReduxProvider> */}
        </div>
    )
}

export default myEventLayout