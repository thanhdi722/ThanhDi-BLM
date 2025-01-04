"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Select, notification } from "antd";

function Index({
  visible,
  selectedCombo,
  onClose,
  dataCombo4v1,
  dataCombo4v2,
  dataCombo4v3,
  dataCombo4v4,
}: any) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (selectedItems: any) => {
    let total = 0;
    selectedItems.forEach((item: any) => {
      const comboPriceAttribute = item.attributes.find(
        (attr: any) => attr.label === "Giá Combo"
      );
      const comboPrice = comboPriceAttribute
        ? parseFloat(comboPriceAttribute.value.replace(/,/g, ""))
        : 0;

      total = comboPrice + total;
    });
    setTotalPrice(total);
  };

  const handleSelectChange = (
    value: any,
    dataSource: any,
    setSelectedItems: any
  ) => {
    const selectedItems = dataSource.filter((item: any, index: any) =>
      value.includes(item.name + index)
    );
    setSelectedItems(selectedItems);
    calculateTotalPrice([...selectedItems]);
  };

  const [selectedItemsOpLung4V1, setSelectedItemsOpLung4V1] = useState([]);
  const [selectedItemsCuongLuc, setSelectedItemsCuongLuc] = useState([]);
  const [selectedItemsCuSac, setSelectedItemsCuSac] = useState([]);
  const [selectedItemsClCamera, setSelectedItemsClCamera] = useState([]);

  useEffect(() => {
    calculateTotalPrice([
      ...selectedItemsOpLung4V1,
      ...selectedItemsCuongLuc,
      ...selectedItemsCuSac,
      ...selectedItemsClCamera,
    ]);
  }, [
    selectedItemsOpLung4V1,
    selectedItemsCuongLuc,
    selectedItemsCuSac,
    selectedItemsClCamera,
  ]);

  const onFinish = async (values: any) => {
    setLoading(true);

    const selectedProducts = [
      ...selectedItemsOpLung4V1,
      ...selectedItemsCuongLuc,
      ...selectedItemsCuSac,
      ...selectedItemsClCamera,
    ]
      .map((item: any) => item.name)
      .filter(Boolean);
    const productString = selectedProducts.join(", ");

    const formData = {
      username: values.username,
      phone: values.phone,
      selectedOptions: productString,
      totalPrice: totalPrice,
      comboName: "Combo 4 16 Series",
    };

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
      notification.success({
        message: "Đặt hàng thành công",
        description: "Chúng tôi sẽ liên hệ sớm nhất!",
      });
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
              wrapperCol={{ span: 24 }}
            >
              <input className="input-modal-combo" placeholder="Họ và tên" />
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
              wrapperCol={{ span: 24 }}
            >
              <input
                className="input-modal-combo"
                placeholder="Số điện thoại"
              />
            </Form.Item>

            <div className="">
              <h3 className="modal-title-combo">Ốp lưng:</h3>
              <Form.Item
                name="op-lung"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  className="input-modal-combo"
                  placeholder="Chọn sản phẩm"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSelectChange(
                      value,
                      dataCombo4v1,
                      setSelectedItemsOpLung4V1
                    )
                  }
                >
                  {dataCombo4v1?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.name + index}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">
                        {item.name}{" "}
                        <span style={{ color: "red" }}>
                          Giá:{" "}
                          {parseFloat(
                            item.attributes.find(
                              (attr: any) => attr.label === "Giá Combo"
                            )?.value || "0"
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                      </div>
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
                  className="input-modal-combo"
                  placeholder="Chọn sản phẩm"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleSelectChange(
                      value,
                      dataCombo4v2,
                      setSelectedItemsCuongLuc
                    )
                  }
                >
                  {dataCombo4v2?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.name + index}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">
                        {item.name}{" "}
                        <span style={{ color: "red" }}>
                          Giá:{" "}
                          {parseFloat(
                            item.attributes.find(
                              (attr: any) => attr.label === "Giá Combo"
                            )?.value || "0"
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="">
              <h3 className="modal-title-combo">CL Camera:</h3>
              <Form.Item
                name="cl-camera"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Chọn sản phẩm"
                  style={{ width: "100%" }}
                  className="input-modal-combo"
                  onChange={(value) =>
                    handleSelectChange(
                      value,
                      dataCombo4v3,
                      setSelectedItemsClCamera
                    )
                  }
                >
                  {dataCombo4v3?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.name + index}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">
                        {item.name}{" "}
                        <span style={{ color: "red" }}>
                          Giá:{" "}
                          {parseFloat(
                            item.attributes.find(
                              (attr: any) => attr.label === "Giá Combo"
                            )?.value || "0"
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                      </div>
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
                  className="input-modal-combo"
                  onChange={(value) =>
                    handleSelectChange(
                      value,
                      dataCombo4v4,
                      setSelectedItemsCuSac
                    )
                  }
                >
                  {dataCombo4v4?.map((item: any, index: any) => (
                    <Select.Option
                      key={`option-${index}`}
                      value={item.name + index}
                      className="modal-option-combo"
                    >
                      <div className="modal-name-combo">
                        {item.name}{" "}
                        <span style={{ color: "red" }}>
                          Giá:{" "}
                          {parseFloat(
                            item.attributes.find(
                              (attr: any) => attr.label === "Giá Combo"
                            )?.value || "0"
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                      </div>
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

export default Index;
