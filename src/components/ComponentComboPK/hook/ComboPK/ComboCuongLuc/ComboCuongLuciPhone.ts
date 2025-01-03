import { useQuery } from "@tanstack/react-query";

const query = `
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
      ...ProductInterfaceField
    }
    
    sort_fields {
      default
      options {
        label
        value
      }
    }
   
    }
}
fragment ProductInterfaceField on ProductInterface {
  name
  url_key
  image {
    url
  }
  price_range {
    ...PriceRangeField
  }
  ...CustomField
}
fragment CustomField on ProductInterface {
  daily_sale {
    end_date
    entity_id
    sale_price
    sale_qty
    saleable_qty
    sold_qty
    start_date
    __typename
  }

  attributes {
   
    value
  }
}
fragment PriceRangeField on PriceRange {
  minimum_price {
    ...ProductPriceField
  }
}
fragment ProductPriceField on ProductPrice {
  final_price {
    currency
    value
  }
 
}
`;

const variables = {
  filter: {
    category_uid: {
      eq: "MTI3",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductComboCuongLucPhone() {
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
  return data?.data?.products?.items;
}

export const useProductComboCuongLucPhone = () => {
  return useQuery({
    queryKey: ["fetchProductComboCuongLucPhone"],
    queryFn: fetchProductComboCuongLucPhone,
    staleTime: 5000,
  });
};
async function fetchProductComboCuongLucPhoneV2() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filter: {
          category_uid: {
            eq: "MTI3",
          },
        },
        pageSize: 10,
        currentPage: 1,
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductComboCuongLucPhoneV2 = () => {
  return useQuery({
    queryKey: ["fetchProductComboCuongLucPhoneV2"],
    queryFn: fetchProductComboCuongLucPhoneV2,
    staleTime: 5000,
  });
};