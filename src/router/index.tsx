import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import RouteLoading from '@/components/loading'

const CustomerService = lazy(() => import("@/page/customerService/customerService"))
const Home = lazy(() => import("@/page/home/home"))

export function RouterContent() {
    return (
        <Routes>
            <Route path={import.meta.env.BASE_URL} element={<Home />}>
                <Route path={import.meta.env.BASE_URL} element={<Navigate to={"/customerService"} replace />} />
                <Route path="customerService" element={RouteLoading(<CustomerService />)} />
            </Route>
        </Routes>
    )
}
