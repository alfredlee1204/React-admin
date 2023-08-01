import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import RouteLoading from '@/components/loading'

const CustomerService = lazy(() => import("@/page/customerService/customerService"))
const ChatWindow = lazy(() => import("@/page/customerService/components/chatWindow/chatWindow"))
const Home = lazy(() => import("@/page/home/home"))

export function RouterContent() {
    return (
        <Routes>
            <Route path={import.meta.env.BASE_URL} element={<Home />}>
                <Route path={import.meta.env.BASE_URL + '*'} element={<Navigate to={"/customerService"} replace />} />{/* 重定向 */}
                <Route path={import.meta.env.BASE_URL} element={<Navigate to={"/customerService"} replace />} />{/* 默认路由 */}
                <Route path="customerService" element={RouteLoading(<CustomerService />)}>
                    <Route path="user/:id" element={<ChatWindow />} />
                </Route>
            </Route>
        </Routes>
    )
}
