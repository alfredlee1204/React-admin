export type SiderMessageList_res = {
  id: string,
  lastMessage: string,
  time: string,
  isread: boolean,
  unreadCount: number,
  user_id: string,
  user_name: string,
  avatar: ''
}

export type SiderMessageList_req = {
  user_id: string
}