import React, { FC, lazy } from "react"
import RouteLoading from '@/components/loading/routeLoading/routingLoading'
// import Home from "@/view/Home/home"
import { Navigate } from "react-router-dom"
const Home = lazy(() => import("@/view/home/home"))
const Login = lazy(() => import("@/view/login/login"))
const Page1 = lazy(() => import("@/view/page1/page1"))

const routes = [
    {
        path: "/*",
        element: <Navigate to="/home" />,

    },
    {
        path: "/",
        element: RouteLoading(<Home />),
        children: [
            {
                path: "/page1",
                element: RouteLoading(<Page1 />),
                children: [
                    {
                        path: "/page1/page1",
                        element: RouteLoading(<Page1 />)
                    }
                ]
            }
        ]
    },
    {
        path: "/home",
        element: RouteLoading(<Home />)
    },
    {
        path: "/login",
        element: RouteLoading(<Login />)
    },
]

export default routes