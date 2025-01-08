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
  const [loading, setLoading] = useState(false);

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
                     
                      Banner {
                      
                        items {
                          
                          link
                          media
                          media_alt
                          name
                          
                        }
                       
                      }
                    }
                   
                  }
                }
              `,
            variables: {
              filter: {
                identifier: {
                  eq: "home-page-big",
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

  const sliderItems = data?.data?.Slider?.items[0]?.Banner?.items;
  console.log("sliderItems", sliderItems);
  return (
    <div
      className="banner-slide-page-warehouse-discharge"
      style={{ zIndex: 2, position: "relative" }}
    >
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
              <div className="OldForNew-Section1-imageSliderBanner slider-mb">
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
      </div>
    </div>
  );
};

export default BannerSlide;
