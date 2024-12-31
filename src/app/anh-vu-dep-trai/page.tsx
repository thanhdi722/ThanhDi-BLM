"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [dataTitle, setDataTitle] = useState<any>(null);
  const [dataProducts, setDataProducts] = useState<any>({});
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
                  query getProducts(
  $search: String
  $filter: ProductAttributeFilterInput
  $sort: ProductAttributeSortInput
  $pageSize: Int
  $currentPage: Int
) {
  products(
    search: $search
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
        url_key
    }
    total_count
    page_info {
      current_page
      page_size
      total_pages
    }  }
}
                `,
            variables: {
              filter: {
                category_uid: {
                  eq: "Mg==",
                },
              },
              pageSize: 5000,
              currentPage: 1,
            },
          }),
        }
      );

      const result = await response.json();
      setDataTitle(result?.data?.products?.items);
    } catch (err) {}
  };

  const fetchProductDetail = async (urlKey: string) => {
    try {
      const response = await fetch(
        "https://beta-api.bachlongmobile.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query router($url: String!) {
  route(url: $url) {
    ... on ConfigurableProduct {
      Installment_products
      ...PoductFiledConfigurable
      options {
        ...CustomizableOption
      }
    }
  }
}


fragment PoductFiledConfigurable on ProductInterface {
  name,
  price_range {
      maximum_price {
        final_price {
          currency
          value
        }
        regular_price {
          currency
          value
        }
      }
    }
  }
 

fragment CustomizableOption on CustomizableOptionInterface {
  ... on CustomizableDropDownOption {
    value {
      option_type_id
      price
      price_type
      title
    }
  }
}`,
            variables: {
              url: urlKey,
            },
          }),
        }
      );

      const result = await response.json();
      setDataProducts((prevDataProducts: any) => ({
        ...prevDataProducts,
        [urlKey]: result,
      }));
    } catch (err) {}
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);

  useEffect(() => {
    if (dataTitle) {
      dataTitle.forEach((item: any) => {
        if (item.url_key) {
          fetchProductDetail(item.url_key);
        }
      });
    }
  }, [dataTitle]);
  console.log("t test", dataProducts);
  return (
    <div>
      <div></div>
      {Object.entries(dataProducts).map(
        ([urlKey, productData]: [string, any], index: number) =>
          productData?.data?.route && (
            <div
              key={index}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <h2>TÊN: {productData?.data?.route?.name}</h2>
              <p>
                Giá BHTD:{" "}
                {productData.data.route.options?.[0]?.value?.[0]?.price}
              </p>
              <p>
                Giá:{" "}
                {
                  productData.data.route.price_range?.maximum_price
                    ?.regular_price?.value
                }
              </p>
              {/* <h3>Options:</h3>
            <ul>
              {productData.data.route.options?.map(
                (option: any, index: number) => (
                  <li key={index}>
                    {option?.value?.map((val: any) => (
                      <div key={val?.option_type_id}>
                        <p>Title: {val?.title}</p>
                        <p>
                          Price: {val?.price}{" "}
                          {productData.data.route.price_range?.maximum_price?.final_price?.currency}
                        </p>
                      </div>
                    ))}
                  </li>
                )
              )}
            </ul> */}
            </div>
          )
      )}
    </div>
  );
}
