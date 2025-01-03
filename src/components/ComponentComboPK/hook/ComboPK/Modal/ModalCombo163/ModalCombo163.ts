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
     label
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
      eq: "NDk4",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductCombo163() {
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

export const useProductCombo163 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo163"],
    queryFn: fetchProductCombo163,
    staleTime: 5000,
  });
};
async function fetchProductCombo163V2() {
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
            eq: "NDk5",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo163V2 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo163V2"],
    queryFn: fetchProductCombo163V2,
    staleTime: 5000,
  });
};
async function fetchProductCombo163V3() {
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
            eq: "NTAw",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo163V3 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo163V3"],
    queryFn: fetchProductCombo163V3,
    staleTime: 5000,
  });
};
async function fetchProductCombo163V4() {
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
            eq: "NTAx",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo163V4 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo163V4"],
    queryFn: fetchProductCombo163V4,
    staleTime: 5000,
  });
};
