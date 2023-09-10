/*
 * @Descripttion: 
 * @Author: Lethan
 * @Date: 2023-04-26 10:03:20
 * @LastEditors: Lethan
 * @LastEditTime: 2023-05-04 14:49:30
 */
import { AlertOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import style from './home.module.scss'
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect } from 'react';
import { useMessage, useWebSocket } from '@/store/rootProvider';
import { observer } from 'mobx-react-lite';

const { Content, Sider } = Layout;

const Home = observer(function Home() {
    const { wsInit } = useWebSocket()
    const { getMessageDataFromLocal } = useMessage()
    const navigateTo = useNavigate();
    const location = useLocation()
    const navigate = (prop: { key: string }) => {
        navigateTo(prop?.key)
    }
    useEffect(() => {
        wsInit('1')
        getMessageDataFromLocal()
    }, [getMessageDataFromLocal, wsInit])

    // 处理侧边菜单的初始化
    const handleMenuInit = () => {
        let key = ''
        key = location.pathname.replace(import.meta.env.BASE_URL, '')
        if (key && key !== import.meta.env.BASE_URL) {
            for (const item of menuList) {
                const index = key.indexOf(item.key)
                if (index > -1) {
                    return item.key
                }
            }
        }
        return 'customerService'
    }
    const menuList = [
        {
            key: 'customerService',
            icon: <AlertOutlined />,
            label: "在线客服",
        }
    ]

    return <>
        <Layout style={{ minHeight: '100%' }}>
            <Sider
                theme="dark"
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className={style["logo-box"]}>
                    <div className={style.logo}>
                        React 管理系统
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[handleMenuInit()]}
                    items={menuList}
                    onClick={navigate}
                />
            </Sider>
            <Layout>
                <Content style={{ backgroundColor: "#eeeeee", padding: '10px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </>
})

export default Home