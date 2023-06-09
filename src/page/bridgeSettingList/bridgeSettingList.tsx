// 第三方桥接配置
import { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { BasePage } from '@/components/basePage/basePage';
import { AdjustMappingGetRes, AdjustMappingAddReq, AdjustMappingGetContent } from '@/service/model';
import Column from 'antd/es/table/Column';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dateFormat from '@/util/date'
import useApi from '@/service/api';
import { useMessage } from '@/use/useMessage/useMessage';

function BridgeSettingList() {
    const [form] = Form.useForm<AdjustMappingAddReq>();
    const [formType, setFormType] = useState("new");
    const [tableData, setTableData] = useState<AdjustMappingGetRes>()
    const [isShowModal, setIsShowModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { adjustMapping_get, adjustMapping_add, adjustMapping_update, adjustMapping_delete } = useApi()
    const { messageApi } = useMessage()
    const showModal = (res?: AdjustMappingAddReq) => {
        if (res) {
            setFormType('edit')
            form.setFieldsValue({ id: res.id, appToken: res.appToken, eventId: res.eventId, eventToken: res.eventToken })
        } else {
            setFormType('new')
        }
        setIsShowModal(true);
    };

    // 获取列表数据
    const getData = useCallback(async (pageNo = 1, pageSize = 10) => {
        const { data } = await adjustMapping_get({ pageNo: pageNo, pageSize: pageSize })
        setTableData(data)
    }, [adjustMapping_get])

    // 提交数据
    const submit = useCallback(() => {
        setConfirmLoading(true);
        form.validateFields().then(async (val) => {
            let res

            if (formType === "new") {
                res = await adjustMapping_add(val)
            } else {
                res = await adjustMapping_update(val)
            }

            if (res.status === 200) {
                messageApi.success('操作成功');
                getData((tableData?.number || 0) + 1);
                setIsShowModal(false);
                form.resetFields()
            }

            setConfirmLoading(false);
        }).catch((err)=>{
            setConfirmLoading(false);
            console.log(err)
        })
    }, [adjustMapping_add, adjustMapping_update, form, formType, getData, messageApi, tableData?.number]);

    // 删除
    const deleteData = useCallback(async (id: number) => {
        const { status } = await adjustMapping_delete(id)

        if (status === 200) {
            messageApi.success('操作成功');
        }
        if (tableData?.totalElements && tableData?.size) {
            const isLast = tableData?.content.length === 1
            const pageNo = isLast ? (tableData?.number || 0) : (tableData?.number || 0) + 1
            getData(pageNo);
        }
    }, [adjustMapping_delete, getData, messageApi, tableData?.content.length, tableData?.number, tableData?.size, tableData?.totalElements])

    // 关闭弹窗
    const handleModalClose = () => {
        form.resetFields()
        setIsShowModal(false);
    };

    const handelPagination = () => {
        if (tableData?.number !== undefined) {
            return 1 + tableData?.number
        }
        return 1
    }

    useEffect(() => {
        getData()
    }, [getData])
    
    return (<BasePage>
        <Table onChange={(res) => { getData(res.current, res.pageSize) }} pagination={{ current: handelPagination(), total: tableData?.totalElements, pageSize: tableData?.size }} rowKey="id" dataSource={tableData?.content}>
            <Column title="编号" dataIndex="id" key="id" />
            <Column title="应用Token" dataIndex="appToken" key="appToken" />
            <Column title="事件ID" dataIndex="eventId" key="eventId" />
            <Column title="事件Token" dataIndex="eventToken" key="eventToken" />
            <Column title="创建时间" render={({ createDate }) => {
                return <><span>{dateFormat(createDate)}</span></>;
            }} />
            <Column title={<Button type="primary" icon={<PlusCircleOutlined />} ghost onClick={() => { showModal() }}>新建</Button>} render={(res: AdjustMappingGetContent) => (
                <>
                    <Button icon={<EditOutlined />} type="primary" onClick={() => { showModal(res) }}>修改</Button>
                    <Popconfirm
                        title="提示"
                        onConfirm={() => { deleteData(res.id) }}
                        description="确认删除?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ marginLeft: "10px" }} icon={<DeleteOutlined />} type="primary" danger>删除</Button>
                    </Popconfirm>
                </>
            )} />
        </Table>
        {/* 弹窗 */}
        <Modal
            title={formType === "new" ? "新建" : "修改"}
            open={isShowModal}
            onOk={submit}
            confirmLoading={confirmLoading}
            onCancel={handleModalClose}
            maskClosable={false}
        >
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                {formType === "edit" ?
                    <Form.Item
                        style={{ marginTop: "20px" }}
                        label="ID"
                        name="id"
                        rules={[{ required: true, message: "" }]}
                    >
                        <Input disabled />
                    </Form.Item> : null
                }
                <Form.Item
                    style={{ marginTop: "20px" }}
                    label="应用Token"
                    name="appToken"
                    rules={[{ required: true, message: "" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="事件ID"
                    name="eventId"
                    rules={[{ required: true, message: "" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="事件Token"
                    name="eventToken"
                    rules={[{ required: true, message: "" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </BasePage>)
}

export default BridgeSettingList