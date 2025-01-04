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
      eq: "MjEz",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductComboBaoDa13() {
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

export const useProductComboBaoDa13 = () => {
  return useQuery({
    queryKey: ["fetchProductComboBaoDa13"],
    queryFn: fetchProductComboBaoDa13,
    staleTime: 5000,
  });
};
