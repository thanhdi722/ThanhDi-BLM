"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Rate,
  Radio,
  Button,
  Card,
  Typography,
  Select,
  Skeleton,
} from "antd";
import { Option } from "antd/es/mentions";
import {
  StarOutlined,
  HeartOutlined,
  MessageOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Image from "next/image";
import "./style.scss";
import { Spin } from "antd";
const { Title, Text } = Typography;
const { TextArea } = Input;

interface BannerItem {
  banner_id: number;
  caption: string;
  link: string;
  media: string;
  media_alt: string;
  name: string;
  slider_id: number;
}

interface Banner {
  __typename: string;
  items: BannerItem[];
  page_info: {
    current_page: number;
    page_size: number;
    total_pages: number;
  };
}

interface SliderItem {
  title: string;
  identifier: string;
  Banner: Banner;
}

interface SliderData {
  Slider: {
    items: SliderItem[];
    total_count: number;
  };
}

interface ApiResponse {
  data: SliderData;
}

export default function PageGopY() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values:", values);
  };
  const fetchBannerHeader = async () => {
    try {
      const response = await fetch(
        "https://beta-api.bachlongmobile.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query getSlider($filter: SliderFilterInput) {
              Slider(filter: $filter) {
                items {
                  Banner {
                    __typename
                    items {
                     name           
                     media                     
                    }       
                  }
                }               
              }
            }
          `,
            variables: {
              filter: {
                identifier: {
                  eq: "don-giang-sinh-24-12",
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);

  const renderHeartIcon = (value: number, index: number) => {
    return <HeartFilled style={{ color: index < value ? "red" : "gray" }} />;
  };

  return (
    <div className="page-gop-y">
      <div>
        {data?.data?.Slider?.items[0]?.Banner?.items[0]?.media ? (
          <img
            src={data.data.Slider.items[0].Banner.items[0].media}
            alt="Banner PC"
            className="Header-bannerPC"
          />
        ) : (
          <Skeleton.Avatar
            active
            size={500}
            shape="square"
            style={{
              width: 1920,
              height: 500,
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
        {data?.data?.Slider?.items[0]?.Banner?.items[1]?.media ? (
          <img
            src={data.data.Slider.items[0].Banner.items[1].media}
            alt="Banner Mobile"
            className="Header-bannerMB"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="container">
        <div className="content-wrapper">
          <Card>
            <Title level={2} className="title">
              ĐÁNH GIÁ CHẤT LƯỢNG DỊCH VỤ
            </Title>

            <div className="importance-section">
              <Title level={4} className="importance-title">
                Tại sao đánh giá rất quan trọng
              </Title>
              <ul className="importance-list">
                <li className="importance-item">
                  <StarOutlined className="icon" />
                  Giúp chúng tôi cải thiện chất lượng
                </li>
                <li className="importance-item">
                  <HeartOutlined className="icon" />
                  Phát triển sản phẩm tốt hơn
                </li>
                <li className="importance-item">
                  <MessageOutlined className="icon" />
                  Nâng cao trải nghiệm khách hàng
                </li>
                <li className="importance-item">
                  <StarOutlined className="icon" />
                  Cải thiện dịch vụ khách hàng
                </li>
              </ul>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={true}
            >
              <div className="form-gop-y">
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập họ và tên của bạn" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập số điện thoại của bạn" />
                </Form.Item>
              </div>
              <div className="form-gop-y">
                <Form.Item
                  name="infoStaff"
                  label="Thông tin nhân viên tư vấn"
                  rules={[
                    { required: true, message: "Thông tin nhân viên tư vấn" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập họ và tên của bạn" />
                </Form.Item>

                <Form.Item
                  name="branch"
                  label="Chi nhánh Bạch Long Mobile quý khách đã mua hàng"
                  rules={[
                    { required: true, message: "Vui lòng chọn chi nhánh" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="Chọn chi nhánh">
                    <Option value="Apple Center: 83 Trần Phú, P.4, Q.5">
                      Apple Center: 83 Trần Phú, P.4, Q.5
                    </Option>
                    <Option value="Samsung Premium Store: 134 Trần Phú, P.4, Q.5">
                      Samsung Premium Store: 134 Trần Phú, P.4, Q.5
                    </Option>
                    <Option value="136 Trần Phú, P.4, Q.5">
                      136 Tr��n Phú, P.4, Q.5
                    </Option>
                    <Option value="225 Trần Quang Khải, P.Tân Định, Q.1">
                      225 Trần Quang Khải, P.Tân Định, Q.1
                    </Option>
                    <Option value="251 - 253 Trần Hưng Đạo, P.Cô Giang, Q.1">
                      251 - 253 Trần Hưng Đạo, P.Cô Giang, Q.1
                    </Option>
                    <Option value="581 Nguyễn Thị Thập, P.Tân Phong, Q.7">
                      581 Nguyễn Thị Thập, P.Tân Phong, Q.7
                    </Option>
                    <Option value="316 - 318 Ba Tháng Hai, P.12, Q.10">
                      316 - 318 Ba Tháng Hai, P.12, Q.10
                    </Option>
                    <Option value="480 - 482 Quang Trung, P.10, Gò Vấp">
                      480 - 482 Quang Trung, P.10, Gò Vấp
                    </Option>
                    <Option value="194 Võ Văn Ngân, P.Bình Thọ, Thủ Đức">
                      194 Võ Văn Ngân, P.Bình Thọ, Thủ Đức
                    </Option>
                    <Option value="Trung tâm bảo hành: 81 Trần Phú, P.4, Q.5">
                      Trung tâm bảo hành: 81 Trần Phú, P.4, Q.5
                    </Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="form-rating">
                <Form.Item
                  name="productQuality"
                  label="Đánh giá chất lượng sản phẩm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng đánh giá chất lượng sản phẩm",
                    },
                  ]}
                >
                  <fieldset className="rating">
                    <input
                      name="productRating"
                      type="radio"
                      id="productRating5"
                      value="5"
                    />
                    <label htmlFor="productRating5" title="5 stars">
                      ☆
                    </label>
                    <input
                      name="productRating"
                      type="radio"
                      id="productRating4"
                      value="4"
                    />
                    <label htmlFor="productRating4" title="4 stars">
                      ☆
                    </label>
                    <input
                      name="productRating"
                      type="radio"
                      id="productRating3"
                      value="3"
                    />
                    <label htmlFor="productRating3" title="3 stars">
                      ☆
                    </label>
                    <input
                      name="productRating"
                      type="radio"
                      id="productRating2"
                      value="2"
                    />
                    <label htmlFor="productRating2" title="2 stars">
                      ☆
                    </label>
                    <input
                      name="productRating"
                      type="radio"
                      id="productRating1"
                      value="1"
                    />
                    <label htmlFor="productRating1" title="1 stars">
                      ☆
                    </label>
                  </fieldset>
                </Form.Item>

                <Form.Item
                  name="serviceQuality"
                  label="Đánh giá chất lượng dịch vụ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng đánh giá chất lượng dịch vụ",
                    },
                  ]}
                >
                  <fieldset className="rating">
                    <input
                      name="serviceRating"
                      type="radio"
                      id="serviceRating5"
                      value="5"
                    />
                    <label htmlFor="serviceRating5" title="5 stars">
                      ☆
                    </label>
                    <input
                      name="serviceRating"
                      type="radio"
                      id="serviceRating4"
                      value="4"
                    />
                    <label htmlFor="serviceRating4" title="4 stars">
                      ☆
                    </label>
                    <input
                      name="serviceRating"
                      type="radio"
                      id="serviceRating3"
                      value="3"
                    />
                    <label htmlFor="serviceRating3" title="3 stars">
                      ☆
                    </label>
                    <input
                      name="serviceRating"
                      type="radio"
                      id="serviceRating2"
                      value="2"
                    />
                    <label htmlFor="serviceRating2" title="2 stars">
                      ☆
                    </label>
                    <input
                      name="serviceRating"
                      type="radio"
                      id="serviceRating1"
                      value="1"
                    />
                    <label htmlFor="serviceRating1" title="1 stars">
                      ☆
                    </label>
                  </fieldset>
                </Form.Item>

                <Form.Item
                  name="staffAttitude"
                  label="Thái độ nhân viên"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng đánh giá thái độ nhân viên",
                    },
                  ]}
                >
                  <fieldset className="rating">
                    <input
                      name="staffRating"
                      type="radio"
                      id="staffRating5"
                      value="5"
                    />
                    <label htmlFor="staffRating5" title="5 stars">
                      ☆
                    </label>
                    <input
                      name="staffRating"
                      type="radio"
                      id="staffRating4"
                      value="4"
                    />
                    <label htmlFor="staffRating4" title="4 stars">
                      ☆
                    </label>
                    <input
                      name="staffRating"
                      type="radio"
                      id="staffRating3"
                      value="3"
                    />
                    <label htmlFor="staffRating3" title="3 stars">
                      ☆
                    </label>
                    <input
                      name="staffRating"
                      type="radio"
                      id="staffRating2"
                      value="2"
                    />
                    <label htmlFor="staffRating2" title="2 stars">
                      ☆
                    </label>
                    <input
                      name="staffRating"
                      type="radio"
                      id="staffRating1"
                      value="1"
                    />
                    <label htmlFor="staffRating1" title="1 stars">
                      ☆
                    </label>
                  </fieldset>
                </Form.Item>
              </div>

              <Form.Item
                name="feedback"
                label="Quý khách vui lòng để lại góp ý hoặc khiếu nại về chất lượng sản phẩm và dịch vụ Bạch Long Mobile"
                rules={[
                  { required: true, message: "Vui lòng nhập góp ý của bạn" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm và dịch vụ của chúng tôi"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="btn-submit-gop-y"
                  htmlType="submit"
                  style={{
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
