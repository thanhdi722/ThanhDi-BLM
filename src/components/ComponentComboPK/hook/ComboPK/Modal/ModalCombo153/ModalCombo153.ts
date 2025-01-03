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
      eq: "NTEw",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductCombo153() {
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

export const useProductCombo153 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo153"],
    queryFn: fetchProductCombo153,
    staleTime: 5000,
  });
};
async function fetchProductCombo153V2() {
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
            eq: "NTEx",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo153V2 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo153V2"],
    queryFn: fetchProductCombo153V2,
    staleTime: 5000,
  });
};
async function fetchProductCombo153V3() {
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
            eq: "NTEy",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return data?.data?.products?.items;
}

export const useProductCombo153V3 = () => {
  return useQuery({
    queryKey: ["fetchProductCombo153V3"],
    queryFn: fetchProductCombo153V3,
    staleTime: 5000,
  });
};
