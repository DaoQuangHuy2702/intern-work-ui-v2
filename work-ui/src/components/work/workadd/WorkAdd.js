import React from "react";
import {
  Drawer,
  Button,
  Popconfirm,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import "antd/dist/antd.css";
import "./WorkAdd.css";
import { useDispatch } from "react-redux";
import { addWorkStart } from "../../../redux/actions/work/actions";

const WorkAdd = (props) => {
  const dispatch = useDispatch();

  const onChangeStartDate = (date) => {
    const current = new Date();
    console.log(date);
    if (current > date) {
      message.error("Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại");
    }
  };

  const handleSubmitFailed = (errorInfo) => {
    message.error("Vui lòng nhập đúng và đầy đủ thông tin");
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="drawer">
      <Drawer
        title="Thêm mới công việc"
        onClose={props.onClose}
        visible={props.visible}
        placement="right"
        width="500"
      >
        <Form
          name="basic"
          form={props.addWorkForm}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={props.onSubmitAddWork}
          onFinishFailed={handleSubmitFailed}
        >
          <Form.Item
            label="Tên công việc"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên công việc!",
              },
            ]}
          >
            <Input placeholder={"Nhập tên công việc"} />
          </Form.Item>

          <Form.Item
            label="ID người thực hiện"
            name="assigneId"
            rules={[
              {
                type: "number",
                min: 1,
                required: true,
                message: "Vui lòng nhập ID người thực hiện!",
              },
            ]}
          >
            <InputNumber
              placeholder={"Nhập ID người thực hiện"}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="ID người tạo"
            name="creatorId"
            rules={[
              {
                type: "number",
                min: 1,
                required: true,
                message: "Vui lòng nhập ID người tạo!",
              },
            ]}
          >
            <InputNumber
              placeholder={"Nhập ID người tạo"}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày bắt đầu!",
              },
            ]}
          >
            <DatePicker onChange={onChangeStartDate} />
          </Form.Item>

          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày kết thúc!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Đánh giá"
            name="rate"
            rules={[
              {
                type: "number",
                min: 1,
                max: 10,
                required: true,
                message: "Vui lòng nhập đánh giá!",
              },
            ]}
          >
            <InputNumber
              placeholder={"Nhập đánh giá"}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm công việc
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default WorkAdd;
