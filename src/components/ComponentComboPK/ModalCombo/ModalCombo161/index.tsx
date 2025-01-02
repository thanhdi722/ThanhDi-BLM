"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Select } from "antd";
import {
  useProductCombo161,
  useProductCombo161V3,
} from "../../hook/ComboPK/Modal/ModalCombo161/ModalCombo161";
import { useProductCombo161V2 } from "../../hook/ComboPK/Modal/ModalCombo161/ModalCombo161";
import "./style.scss";
function index({ visible, selectedCombo, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { data } = useProductCombo161();
  const { data: dataV2 } = useProductCombo161V2();
  const { data: dataV3 } = useProductCombo161V3();
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (selectedItems: any) => {
    let total = 0;
    selectedItems.forEach((item: any) => {
      const comboPriceAttribute = item.attributes.find(
        (attr: any) => attr.label === "Giá Combo"
      );
      const comboPrice = comboPriceAttribute
        ? parseFloat(comboPriceAttribute.value)
        : 0;
      total += comboPrice;
    });
    setTotalPrice(total);
  };

  const handleSelectChange = (
    value: any,
    dataSource: any,
    setSelectedItems: any
  ) => {
    const selectedItems = dataSource.filter((item: any) =>
      value.includes(item.url_key)
    );
    setSelectedItems(selectedItems);
    calculateTotalPrice([...selectedItems]);
  };

  const [selectedItemsOpLung, setSelectedItemsOpLung] = useState([]);
  const [selectedItemsCuongLuc, setSelectedItemsCuongLuc] = useState([]);
  const [selectedItemsCuSac, setSelectedItemsCuSac] = useState([]);

  useEffect(() => {
    calculateTotalPrice([
      ...selectedItemsOpLung,
      ...selectedItemsCuongLuc,
      ...selectedItemsCuSac,
    ]);
  }, [selectedItemsOpLung, selectedItemsCuongLuc, selectedItemsCuSac]);

  const onFinish = async (values: any) => {
    setLoading(true);

    // Combine all selected products into a single string
    const selectedProducts = selectedCombo?.items
      .map((item: any) => values[item.type])
      .filter(Boolean);
    const productString = selectedProducts?.join(", ");

    const formData = {
      username: values.username,
      phone: values.phone,
      selectedOptions: productString,
      totalPrice: 0,
      comboName: selectedCombo?.combo,
    };

    console.log("Form data to be sent:", formData);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbysamsKFA9Pbr0czRuXVDWKpnCo5BM3HxutpKXLPY_jemM6GZTBCkR6_5oe-nlnK92pbw/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  return (
    <div>
      <Modal visible={visible} onCancel={onClose} footer={false} width={700}>
        {selectedCombo && (
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <h2 className="title-modal-combo">{selectedCombo.combo}</h2>
            <h3 className="modal-title-combo">Họ và tên:</h3>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <input className="input-modal-combo" />
            </Form.Item>
            <h3 className="modal-title-combo">Số điện thoại:</h3>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^\d{10}$/,
                  message: "Số điện thoại phải có 10 chữ số",
                },
              ]}
            >
              <input className="input-modal-combo" />
            </Form.Item>

            <div className="">
              <h3 className="modal-title-combo">Ốp lưng:</h3>
              <Form.Item
                name="op-lung"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Chọn sản phẩm"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSelectChange(value, data, setSelectedItemsOpLung)
                  }
                >
                  {data?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.url_key}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">{item.name}</div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="">
              <h3 className="modal-title-combo">Cường Lực:</h3>
              <Form.Item
                name="cuong-luc"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Chọn sản phẩm"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSelectChange(value, dataV2, setSelectedItemsCuongLuc)
                  }
                >
                  {dataV2?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.url_key}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">{item.name}</div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="">
              <h3 className="modal-title-combo">Củ sạc:</h3>
              <Form.Item
                name="cu-sac"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Chọn sản phẩm"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSelectChange(value, dataV3, setSelectedItemsCuSac)
                  }
                >
                  {dataV3?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.url_key}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">{item.name}</div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="modal-price-wrap">
              <span>Tổng tiền: </span>
              <h3 className="modal-price">{totalPrice.toLocaleString()} VND</h3>
            </div>
            <Form.Item wrapperCol={{ span: 16 }} className="modal-btn-wrap">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="modal-btn"
              >
                {loading ? "Đang đặt hàng..." : "Đặt hàng ngay"}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default index;
