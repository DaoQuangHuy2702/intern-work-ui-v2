import React from "react";
import { Modal, Row, Col } from "antd";

const WorkDetail = (props) => {
  const convertDate = (dateInput) => {
    const date = new Date(dateInput);

    const [day, month, year] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ];
    const dayConvert = day / 10 >= 1 ? day : `0${day}`;
    const monthConvert = month / 10 >= 1 ? month : `0${month}`;

    return `${dayConvert}/${monthConvert}/${year}`;
  };

  return (
    <div className="detail">
      <Modal
        title="Thông tin công việc"
        visible={props.visitbleDetailForm}
        onCancel={props.onCloseDetailForm}
        onOk={props.onCloseDetailForm}
        width={400}
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Tên công việc:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {props.data?.name}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Id người thực hiện:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {props.data?.assigneId}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Id người tạo:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {props.data?.creatorId}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Ngày giao việc:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {convertDate(props.data?.dueDate)}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Ngày bắt đầu:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {convertDate(props.data?.startDate)}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Ngày kết thúc:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {convertDate(props.data?.endDate)}
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={24} style={{ marginBottom: "10px" }}>
              <Col className="gutter-row" span={12}>
                <b>Đánh giá:</b>
              </Col>
              <Col className="gutter-row" span={12}>
                {props.data?.rate}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default WorkDetail;
