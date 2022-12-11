/*
 * @Descripttion: 
 * @Author: Lethan
 * @Date: 2022-12-09 14:38:15
 * @LastEditors: Lethan
 * @LastEditTime: 2022-12-09 16:30:08
 */
import React from "react"
import style from './login.module.scss'
import { Button, Checkbox, Form, Input, Tooltip, Typography } from 'antd';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigateTo = useNavigate();
    const onFinish = (values: any) => {
        navigateTo('/home')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={style["container"]}>
            <div className={style["login-box"]}>
                <div className={style["title"]}>登录</div>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 15, span: 7 }}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div className={style["tips"]}>
                    没有账号？
                    <span>点击前往注册</span>
                </div>
                <div className={style["tips"]}>
                    忘记密码？
                    <span>点击找回密码</span>
                </div>
            </div>
        </div>)
}
export default Login