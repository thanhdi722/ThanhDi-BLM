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
      eq: "coc-cap-sac-valentine",
    },
  },
  pageSize: 99,
  currentPage: 1,
};
const variables1 = {
  filter: {
    sale_type: {
      eq: "pin-du-phong-valentine",
    },
  },
  pageSize: 99,
  currentPage: 1,
};
const variables2 = {
  filter: {
    sale_type: {
      eq: "tai-nghe-valentine",
    },
  },
  pageSize: 99,
  currentPage: 1,
};
const variables3 = {
  filter: {
    sale_type: {
      eq: "khac-valentine",
    },
  },
  pageSize: 99,
  currentPage: 1,
};
async function fetchProductPhuKienCocCapSac() {
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
async function fetchProductPhuKienPinDuPhong() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables1,
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}
async function fetchProductPhuKienTaiNghe() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables2,
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}
async function fetchProductPhuKienKhac() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables3,
    }),
  });

  const data = await response.json();
  return data.data.DailySales.items;
}

export const useProductPhuKienCocCapSac = () => {
  return useQuery({
    queryKey: ["fetchProductPhuKienCocCapSac"],
    queryFn: fetchProductPhuKienCocCapSac,
    staleTime: 5000,
  });
};
export const useProductPhuKienPinDuPhong = () => {
  return useQuery({
    queryKey: ["fetchProductPhuKienPinDuPhong"],
    queryFn: fetchProductPhuKienPinDuPhong,
    staleTime: 5000,
  });
};
export const useProductPhuKienTaiNghe = () => {
  return useQuery({
    queryKey: ["fetchProductPhuKienTaiNghe"],
    queryFn: fetchProductPhuKienTaiNghe,
    staleTime: 5000,
  });
};
export const useProductPhuKienKhac = () => {
  return useQuery({
    queryKey: ["fetchProductPhuKienKhac"],
    queryFn: fetchProductPhuKienKhac,
    staleTime: 5000,
  });
};
