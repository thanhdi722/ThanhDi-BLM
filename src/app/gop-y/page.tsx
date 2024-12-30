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
  const [productRating, setProductRating] = useState<number>(0);
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [staffRating, setStaffRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    console.log("Received values:", values);
    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbynTwOHeCJ_5e4_IgDkANJJQF-mf97TDVvtdKlH6VzxNM3vpl8tFRbE9rAHNSkbWK32BQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      if (result.result === "success") {
        console.log("Data sent to Google Sheets successfully");
      }
    } catch (error) {
      console.error("Error sending data to Google Sheets", error);
    }
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
    } finally {
      setLoading(false); // Reset loading state after submission
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
              initialValues={{
                productQuality: productRating,
                serviceQuality: serviceRating,
                staffAttitude: staffRating,
              }}
            >
              <div className="form-gop-y">
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập họ và tên của bạn" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập số điện thoại của bạn" />
                </Form.Item>
              </div>
              <div className="form-gop-y">
                <Form.Item
                  name="infoStaff"
                  label="Thông tin nhân viên tư vấn"
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Nhập họ và tên của bạn" />
                </Form.Item>

                <Form.Item
                  name="branch"
                  label="Chi nhánh Bạch Long Mobile quý khách đã mua hàng"
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
                      136 Trần Phú, P.4, Q.5
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
                  <Rate
                    value={productRating}
                    onChange={(value) => setProductRating(value)}
                  />
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
                  <Rate
                    value={serviceRating}
                    onChange={(value) => setServiceRating(value)}
                  />
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
                  <Rate
                    value={staffRating}
                    onChange={(value) => setStaffRating(value)}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="feedback"
                label="Quý khách vui lòng để lại góp ý hoặc khiếu nại về chất lượng sản phẩm và dịch vụ Bạch Long Mobile"
              >
                <TextArea
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm và dịch vụ của chúng tôi"
                />
              </Form.Item>
              <div className="cam-ket-bao-mat">
                <h2 style={{ width: "100%" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    CAM KẾT BẢO MẬT
                  </strong>
                </h2>
                <strong style={{ color: "red", fontWeight: "700" }}>
                  {" "}
                  Bạch Long Mobile
                </strong>{" "}
                cam kết bảo mật thông tin để nhằm nâng cao chất lượng phục vụ và
                được gửi trực tiếp Ban Giám Đốc để kiểm tra và xử lý. <br /> Cảm
                ơn khách hàng đã tin tưởng, đồng hành và góp ý cho
                <strong style={{ color: "red", fontWeight: "700" }}>
                  {" "}
                  Bạch Long Mobile
                </strong>
                .
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  className="btn-submit-gop-y"
                  htmlType="submit"
                  style={{
                    margin: "20px auto",
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
