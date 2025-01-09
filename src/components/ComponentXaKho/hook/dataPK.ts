import { useQuery } from "@tanstack/react-query";

const query = `
	query getProductDailySales(
  $filter: DailySaleFilterInput
  $pageSize: Int
  $currentPage: Int
) {
  DailySales(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
    items {
	 title
      identifier
      items {
        product {
          name
          url_key
		   image {
            url
          }
          	price_range {
             minimum_price {
   						   
                  final_price {
                  
  									value
                  }
                 
 						 }
 					 }
        }
        sale_price
        price_original
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    total_count
  }
}
`;

const variables = {
  filter: {
    sale_type: {
      eq: "sp-pk-xa-kho",
    },
  },
  pageSize: 99,
  currentPage: 1,
};

async function fetchProductSaleDataPKXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataPKXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataPKXaKho"],
    queryFn: fetchProductSaleDataPKXaKho,
    staleTime: 5000,
  });
};
async function fetchProductSaleDataPKDanManXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-pk-cuong-luc-24-12",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataPKDanManXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataPKDanManXaKho"],
    queryFn: fetchProductSaleDataPKDanManXaKho,
    staleTime: 5000,
  });
};
async function fetchProductSaleDataPKBaoDaXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-pk-bao-da-24-12",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataPKBaoDaXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataPKBaoDaXaKho"],
    queryFn: fetchProductSaleDataPKBaoDaXaKho,
    staleTime: 5000,
  });
};
async function fetchProductSaleDataPKCocCapXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-coc-cap-sac-24-12",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataPKCocCapXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataPKCocCapXaKho"],
    queryFn: fetchProductSaleDataPKCocCapXaKho,
    staleTime: 5000,
  });
};
async function fetchProductSaleDataMAYXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-may-xa-kho",
          },
        },
        pageSize: 99,
        currentPage: 1,
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataMAYXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataMAYXaKho"],
    queryFn: fetchProductSaleDataMAYXaKho,
    staleTime: 5000,
  });
};
async function fetchProductSaleDataMAYSAMSUNGXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-dt-samsung",
          },
        },
        pageSize: 99,
        currentPage: 1,
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataMAYSAMSUNGXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataMAYSAMSUNGXaKho"],
    queryFn: fetchProductSaleDataMAYSAMSUNGXaKho,
    staleTime: 5000,
  });
};
async function fetchProductSaleDataMAY99XaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-samsung-99-12-12",
          },
        },
        pageSize: 99,
        currentPage: 1,
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataMAY99XaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataMAY99XaKho"],
    queryFn: fetchProductSaleDataMAY99XaKho,
    staleTime: 5000,
  });
};

async function fetchProductSaleDataMAYSSXaKho() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          sale_type: {
            eq: "sp-pad-xa-kho",
          },
        },
        pageSize: 99,
        currentPage: 1,
      },
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductSaleDataMAYSSXaKho = () => {
  return useQuery({
    queryKey: ["fetchProductSaleDataMAYSSXaKho"],
    queryFn: fetchProductSaleDataMAYSSXaKho,
    staleTime: 5000,
  });
};
