/*
 * @Descripttion: 
 * @Author: Lethan
 * @Date: 2023-04-26 10:03:20
 * @LastEditors: Lethan
 * @LastEditTime: 2023-05-04 14:49:30
 */
import { AlertOutlined, ExperimentOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import style from './home.module.scss'
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const { Content, Sider } = Layout;

function Home() {
    const navigateTo = useNavigate();
    const location = useLocation()
    const navigate = (prop: { key: string }) => {
        navigateTo(prop?.key)
    }

    // 处理侧边菜单的初始化
    const handleMenuInit =()=>{
        let key=''
        key = location.pathname.replace(import.meta.env.BASE_URL+'/', '')
        if(key&&key!==import.meta.env.BASE_URL) {
            return key
        }
        return 'verifyEnvList'
    }
    const menuList = [
        {
            key: 'verifyEnvList',
            icon: <AlertOutlined />,
            label: "审核环境列表",
        }, {
            key: 'bridgeSettingList',
            icon: <ExperimentOutlined />,
            label: "第三方桥接配置",
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
                        代上架管理后台
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
                <Content style={{ backgroundColor: "#eeeeee", padding: '5px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </>
}

export default Home