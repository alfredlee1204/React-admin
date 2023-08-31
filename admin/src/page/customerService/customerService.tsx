import { observer } from "mobx-react-lite"
import cssStyle from './customerService.module.scss'
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";

import DefaultAvatarSVG from '@/assets/images/default-user.svg'
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRootStore } from "@/store/rootProvider";
import { Conversation } from "@/store/socket/model";

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
    const { messageRecordStore } = useRootStore()
    return (
        <Sider
            style={{ backgroundColor: "#f5f5f5", }}
        >
            <div className={cssStyle["message-sider"]}>
                <div className={cssStyle["message-sider-title"]}>用户列表</div>
                <div className={cssStyle["message-sider-list"]}>
                    {
                        messageRecordStore.conversationList.map(item => {
                            return <ConversationItem key={item.id} item={item} />
                        })
                    }
                </div>
            </div>
        </Sider>
    )
})

const ConversationItem = observer((prop: { item: Conversation }) => {
    const navigateTo = useNavigate();
    const { id } = useParams();
    const { item } = prop

    return (
        <div style={{ backgroundColor: id === item.user_id + '' ? 'rgb(115, 103, 240, 0.1)' : '#fff' }}>
            <div className={cssStyle["msssage-sider-item"]} onClick={() => { navigateTo('user/' + item.user_id) }}>
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
                <div className={cssStyle["msg-count"]}>{item.unreadCount > 99 ? `99+` : item.unreadCount}</div>
            </div>
        </div>
    )
})



export default CustomerService