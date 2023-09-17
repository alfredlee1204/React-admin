import { AlertOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import style from './index.module.scss'
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import { useMessage, useNavigateMobx, useWebSocket } from '@/store/rootProvider';
import { observer } from 'mobx-react-lite';
import { Header } from 'antd/es/layout/layout';

const { Content, Sider } = Layout;

const Index = observer(function Index() {
    const { wsInit } = useWebSocket()
    const { init } = useNavigateMobx()
    const { getMessageDataFromLocal } = useMessage()
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        init(navigate)
    }, [init, navigate])

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
            key: 'home',
            icon: <HomeOutlined />,
            label: "首页",
        },
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
                    onClick={(e) => navigate(e.key)}
                />
            </Sider>
            <Layout>
                <Header className={style["header"]}>
                    <div className="demo-logo" />
                </Header>
                <Content style={{ backgroundColor: "#eeeeee", padding: '10px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </>
})

export default Index