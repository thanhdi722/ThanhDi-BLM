"use client";
import React, { useEffect, useState } from "react";
import { FormProps, Carousel, Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./banner-slide.scss";
import iconbaoda from "../../../../public/icon-baoda.png";
import iconcuongluc from "../../../../public/icon-cuongluc.png";
import iconsacduphong from "../../../../public/icon-sacduphong.png";
import iconapple from "../../../../public/icon-apple.png";
import iconlaptop from "../../../../public/icon-laptop.png";
import iconcapsac from "../../../../public/icon-capsac.png";
import iconloa from "../../../../public/icon-loa.png";
import Image from "next/image";
import bannerSlider from "../../../../public/banner-pk-apple-1200-040624.png";
import bannerSlider2 from "../../../../public/banner-slide-01.png";
import images1 from "../../../../public/combo-pk/image1.png";
import images2 from "../../../../public/combo-pk/image2.png";
import images3 from "../../../../public/combo-pk/image3.png";
import images4 from "../../../../public/combo-pk/image4.png";
import images5 from "../../../../public/combo-pk/image5.png";
import images6 from "../../../../public/combo-pk/image6.png";
import images7 from "../../../../public/combo-pk/image7.png";
import images8 from "../../../../public/combo-pk/image8.png";
import images9 from "../../../../public/combo-pk/image9.png";

import Link from "next/link";
type FieldType = {
  username?: string;
  phone?: string;
  selectedOptions?: { [key: string]: string };
};

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
const BannerSlide = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenTest, setModalIsOpenTest] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [customerData, setCustomerData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=_r2Tnu3qTrt7FRaAe6XPptz6lD9UD8qOCA68N6XZoVQyQA3iXUg7WJwNgDdQsCWEuCsR_HO3pOMONNHgxublinyWF-UonaYjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNI54tzkJFaj-2iqaolXYotR08AGyFDWn--IfZJqRMOkhO8zfrvzkwbu57uzLUW5qHdqhbqBsOC_67mC9p03Mhbyn1Z4YyOlLg&lib=MFcmlpet2YYsjuSSgQUXZZPGWYEKb6JDU",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCustomerData(data);
        console.log("Customer data:", data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  interface ProductCombo16 {
    combo: string;
    persen: string;
    items: {
      type: string;
      items: {
        nameproduct: string;
        priceorigin: number;
        comboprice: number;
      }[];
    }[];
  }
  [];

  const handleClickLeatherCase = () => {
    const LeatherCase = document.getElementById("item-leather-case");
    if (LeatherCase) {
      LeatherCase.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickApple = () => {
    const Apple = document.getElementById("item-apple");
    if (Apple) {
      Apple.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickBackupCharger = () => {
    const BackupCharger = document.getElementById("item-backup-charger");
    if (BackupCharger) {
      BackupCharger.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickLaptop = () => {
    const Laptop = document.getElementById("item-laptop");
    if (Laptop) {
      Laptop.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickChargingCable = () => {
    const ChargingCable = document.getElementById("item-charging-cable");
    if (ChargingCable) {
      ChargingCable.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickLoudspeaker = () => {
    const Loudspeaker = document.getElementById("item-loudspeaker");
    if (Loudspeaker) {
      Loudspeaker.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickSamSung = () => {
    const SamSung = document.getElementById("item-samsung");
    if (SamSung) {
      SamSung.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickStrength = () => {
    const Strength = document.getElementById("item-strength");
    if (Strength) {
      Strength.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [selectedCombo, setSelectedCombo] = useState<ProductCombo16 | null>(
    null
  );
  const handleClickTest = (combo: ProductCombo16) => {
    setSelectedCombo(combo);
    setModalIsOpenTest(true);
  };

  const [data, setData] = useState<ApiResponse | null>(null);

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
                      title
                      identifier
                      Banner {
                        __typename
                        items {
                          banner_id
                          caption
                          link
                          media
                          media_alt
                          name
                          slider_id
                        }
                        page_info {
                          current_page
                          page_size
                          total_pages
                        }
                      }
                    }
                    total_count
                  }
                }
              `,
            variables: {
              filter: {
                identifier: {
                  eq: "banner-page-combo-phu-kien",
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
  console.log("dataa check banner", data);
  const sliderItems = data?.data?.Slider?.items[0]?.Banner?.items.filter(
    (item) => item.name.includes("slider combo phụ kiện")
  );
  return (
    <div className="banner-slide">
      <div className="container">
        <div
          className=""
          style={{
            display: "flex",
            gap: "10px",
            margin: "auto",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          {loading ? (
            <Spin>
              <div style={{ width: 1820, height: 200 }} />
            </Spin>
          ) : sliderItems?.length ? (
            <>
              <div className="OldForNew-Section1-imageSliderBanner">
                <Carousel
                  autoplay
                  autoplaySpeed={2000}
                  dots={false}
                  arrows={true}
                >
                  {sliderItems.map((item) => (
                    <Link key={item.banner_id} href={item.link}>
                      <div className="OldForNew-Section1-image">
                        <Image
                          src={item.media}
                          alt={item.media_alt || ""}
                          width={1200}
                          height={600}
                          className="OldForNew-Section1-imageItem"
                        />
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </div>
              <div className="OldForNew-Section1-imageSliderBanner">
                <Carousel
                  autoplay
                  autoplaySpeed={2000}
                  dots={false}
                  arrows={true}
                >
                  {sliderItems
                    .slice()
                    .reverse()
                    .map((item) => (
                      <Link key={item.banner_id} href={item.link}>
                        <div className="OldForNew-Section1-image">
                          <Image
                            src={item.media}
                            alt={item.media_alt || ""}
                            width={1200}
                            height={600}
                            className="OldForNew-Section1-imageItem"
                          />
                        </div>
                      </Link>
                    ))}
                </Carousel>
              </div>
            </>
          ) : (
            <p></p>
          )}
        </div>

        <div>
          <ul className="list-item-click-combo-pk">
            {/* <li className='item-click' onClick={handleClickSamSung}>
							<Image src={iconSamsung} alt='banner-slide-01' className='icon-itemClick' />
							<p className='item-click-txt'>SamSung</p>
						</li> */}
            <li className="item-click" onClick={handleClickLeatherCase}>
              <Image
                src={iconbaoda}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Bao da/ốp lưng</p>
            </li>
            <li className="item-click" onClick={handleClickStrength}>
              <Image
                src={iconcuongluc}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Dán màn hình</p>
            </li>
            <li className="item-click" onClick={handleClickBackupCharger}>
              <Image
                src={iconsacduphong}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Pin dự phòng</p>
            </li>{" "}
            <li className="item-click" onClick={handleClickChargingCable}>
              <Image
                src={iconcapsac}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Cốc, cáp sạc</p>
            </li>{" "}
            {/* <li className="item-click" onClick={handleClickEarphone}>
              <Image
                src={icontainghe}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Tai nghe</p>
            </li>{" "} */}
            {/* <li className="item-click" onClick={handleClickWatch}>
              <Image
                src={icondongho}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Đồng hồ</p>
            </li> */}
            {/* <li className="item-click" onClick={handleClickUsb}>
              <Image
                src={iconthenho}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Thẻ nhớ, USB, Hub</p>
            </li> */}
            <li className="item-click" onClick={handleClickLoudspeaker}>
              <Image
                src={iconloa}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Tai nghe, loa</p>
            </li>
            <li className="item-click" onClick={handleClickLaptop}>
              <Image
                src={iconlaptop}
                alt="banner-slide-01"
                className="icon-itemClick"
              />
              <p className="item-click-txt">Đồ chơi công nghệ</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
