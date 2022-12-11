import React, { Children, useEffect, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
    {
        label: '用户管理',
        key: '/page1',
        icon: <UserOutlined />,
        children: [
            {
                label: '用户管理',
                key: '/page1/page1',
            }
        ]
    }

];

const MainMenu: React.FC = () => {
    const navigateTo = useNavigate();
    let currentRoute = useLocation()
    console.log(location.hash)
    const [itemKeys, setiItemKeys] = useState<string[]>([""]);
    const navigate = (prop: { key: string }) => {
        navigateTo(prop?.key)
    }
    useEffect(() => {

    })
    //菜单项(打开一项后关闭其他项)
    const handleItemOpen = (keyArr: string[]) => {
        setiItemKeys([keyArr[keyArr.length - 1]]);
    }

    return (
        <Menu theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} onClick={navigate} onOpenChange={handleItemOpen} openKeys={itemKeys} />

    )
}
export default MainMenu