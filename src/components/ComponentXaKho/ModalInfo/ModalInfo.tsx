import React, { useMemo, useState } from "react";
import { Modal, Spin, Form, Input, Checkbox } from "antd";
import "./ModalInfo.scss";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { Button, Divider, notification, Space } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];
interface ProductItem {
  name: string;
  price1: number;
}
const Context = React.createContext({ name: "Default" });
interface ModalFormProps {
  visible: boolean; // Kiểu dữ liệu cho visible
  onCancel: () => void; // Kiểu dữ liệu cho onCancel
  product: ProductItem | null; // Add product prop
}
const ModalForm: React.FC<ModalFormProps> = ({
  visible,
  onCancel,
  product,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Đăng ký thành công`,
      description: (
        <Context.Consumer>
          {({ name }) => <span>Chúc mừng bạn đã đăng ký thành công</span>}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const [loading, setLoading] = useState(false);
  const handleOk = async (values: any) => {
    console.log("Form data: ", values);
    setLoading(true);
    // Send form data to Google Sheets
    try {
      const dataToSend = {
        ...values,
        productName: product?.name, // Add productName from product prop
        price: product?.price1, // Add price from product prop
      };
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyk9SIAxTIM--HkPzDuOYbWzplDnLC1n527jwOW4-0m-uHehJtjr_PcH8U1coh-4hs/exec?sheet=thongkhachhangxakho",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // Use the new data object
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    } finally {
      setLoading(false);
      openNotification("topRight");
      onCancel();
    }
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Modal visible={visible} onCancel={onCancel} footer={null} centered>
          <h2 className="ModalInfo-title">
            Nhập Thông Tin Để Chúng Tôi Liên Hệ Bạn Sớm nhất
          </h2>
          <Form layout="vertical" onFinish={handleOk}>
            <Form.Item
              label="Nhập họ tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    len: 10,
                    message: "Số điện thoại phải có 10 số!",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                style={{ width: "100%" }}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </div>

            {loading && (
              <Form.Item>
                <button className="ModalInfo-button">
                  <span>Đang lấy thồng tin</span>
                  <Spin />
                </button>
              </Form.Item>
            )}
            {!loading && (
              <Form.Item>
                <button className="ModalInfo-button">Đăng ký ngay</button>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </Context.Provider>
    </>
  );
};

export default ModalForm;
