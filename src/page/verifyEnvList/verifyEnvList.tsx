// 审核环境列表
import { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { BasePage } from '@/components/basePage/basePage';
import { SysParmsAddReq, SysParmsGetRes, SysParmsGetContent } from '@/service/model';
import Column from 'antd/es/table/Column';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import useApi from '@/service/api';
import { useMessage } from '@/use/useMessage/useMessage';

function VerifyEnvList() {
  const [form] = Form.useForm<SysParmsAddReq>();
  const [formType, setFormType] = useState("new");
  const [tableData, setTableData] = useState<SysParmsGetRes>()
  const [isShowModal, setIsShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { sysParms_get, sysParms_add, sysParms_update } = useApi()
  const { messageApi } = useMessage()

  const showModal = (res?: SysParmsGetContent) => {
    if (res) {
      setFormType('edit')
      form.setFieldsValue({ id: res.id, remark: res.remark, code: res.code, value: res.value })
    } else {
      setFormType('new')
    }
    setIsShowModal(true);
  };

  // 获取列表数据
  const getData = useCallback(async (pageNo = 1, pageSize = 10) => {
    const { data } = await sysParms_get({ pageNo: pageNo, pageSize: pageSize })
    setTableData(data)
  }, [sysParms_get])

  // 提交数据
  const submit = useCallback(() => {
    setConfirmLoading(true);
    form.validateFields().then(async (val) => {
      let res

      if (formType === "new") {
        res = await sysParms_add(val)
      } else {
        res = await sysParms_update(val)
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
  }, [form, formType, getData, messageApi, sysParms_add, sysParms_update, tableData?.number]);

  // 关闭弹窗
  const handleModalClose = () => {
    form.resetFields()
    setIsShowModal(false);
  };

  useEffect(() => {
    getData()
  }, [getData])

  return (<BasePage>
    <Table onChange={(res) => { getData(res.current, res.pageSize) }} pagination={{ total: tableData?.totalElements, pageSize: tableData?.size }} rowKey="id" dataSource={tableData?.content}>
      <Column title="编号" dataIndex="id" key="id" />
      <Column title="包名" dataIndex="code" key="code" />
      <Column title="内容" dataIndex="value" key="value" />
      <Column title="备注" dataIndex="remark" key="remark" />
      <Column title={<Button type="primary" icon={<PlusCircleOutlined />} ghost onClick={() => { showModal() }}>新建</Button>} render={(res: SysParmsGetContent) => (
        <Button icon={<EditOutlined />} type="primary" onClick={() => { showModal(res) }}>修改</Button>
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
          label="包名"
          name="code"
          rules={[{ required: true, message: "" }]}
        >
          <Input disabled={formType === 'edit' ? true : false} />
        </Form.Item>
        <Form.Item
          label="内容"
          name="value"
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </BasePage>)
}

export default VerifyEnvList