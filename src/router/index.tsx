import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import RouteLoading from '@/components/loading'

const VerifyEnvList = lazy(() => import("@/page/verifyEnvList/verifyEnvList"))
const BridgeSettingList = lazy(() => import("@/page/bridgeSettingList/bridgeSettingList"))
const Home = lazy(() => import("@/page/home/home"))

export function RouterContent() {
    return(
        <Routes>
            <Route path={import.meta.env.BASE_URL} element={<Home />}>
                <Route path={import.meta.env.BASE_URL} element={<Navigate to={import.meta.env.BASE_URL+"/verifyEnvList"} replace />}/>
                <Route path="verifyEnvList" element={RouteLoading(<VerifyEnvList />)} />
                <Route path="bridgeSettingList" element={RouteLoading(<BridgeSettingList />)} />
            </Route>
        </Routes>
    )
}
