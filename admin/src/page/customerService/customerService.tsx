import { observer } from "mobx-react-lite"
import cssStyle from './customerService.module.scss'
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";

import DefaultAvatarSVG from '@/assets/images/default-user.svg'
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useMessage, useRootStore } from "@/store/rootProvider";
import { Conversation } from "@/store/socket/model";
import { useEffect } from "react";

const CustomerService = observer(() => {
    return <Layout style={{ height: '100%', borderRadius: 10, overflow: "hidden" }}>
        <ConversationSider></ConversationSider>
        <Layout>
            <Outlet />
        </Layout>
    </Layout>
})

// 侧边栏-会话列表
const ConversationSider = observer(() => {
    const { conversationList, readMsg } = useMessage()
    return (
        <Sider
            style={{ backgroundColor: "#f5f5f5", }}
        >
            <div className={cssStyle["message-sider"]}>
                <div className={cssStyle["message-sider-title"]}>会话列表</div>
                <div className={cssStyle["message-sider-list"]}>
                    {
                        conversationList.get().map((item, index) => {
                            return <ConversationItem key={index} item={item} />
                        })
                    }
                </div>
            </div>
        </Sider>
    )
})

const ConversationItem = observer((prop: { item: Conversation }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { item } = prop

    return (
        <div style={{ backgroundColor: id === item.user_id + '' ? 'rgb(115, 103, 240, 0.1)' : '#fff' }}>
            <div className={cssStyle["msssage-sider-item"]} onClick={() => { navigate('user/' + item.user_id) }}>
                <div className={cssStyle["avatar"]}>
                    <img src={item.avatar ? item.avatar : DefaultAvatarSVG} />
                </div>
                <div className={cssStyle["right"]}>
                    <div className={cssStyle["name"]}>
                        {item.user_name}
                    </div>
                    <div className={cssStyle["message"]}>
                        {item.lastMessage}
                    </div>
                </div>
                {item.unreadCount > 0 && <div className={cssStyle["msg-count"]}>{item.unreadCount > 99 ? `99+` : item.unreadCount}</div>}
            </div>
        </div>
    )
})



export default CustomerService