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
      eq: "NTEz",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductCombo154() {
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

export const useProductCombo154 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo154"],
    queryFn: fetchProductCombo154,
    staleTime: 5000,
  });
};
async function fetchProductCombo154V2() {
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
            eq: "NTE0",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo154V2 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo154V2"],
    queryFn: fetchProductCombo154V2,
    staleTime: 5000,
  });
};
async function fetchProductCombo154V3() {
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
            eq: "NTE1",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo154V3 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo154V3"],
    queryFn: fetchProductCombo154V3,
    staleTime: 5000,
  });
};
async function fetchProductCombo154V4() {
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
            eq: "NTE2",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo154V4 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo154V4"],
    queryFn: fetchProductCombo154V4,
    staleTime: 5000,
  });
};
