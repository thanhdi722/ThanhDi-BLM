import { useQuery } from '@tanstack/react-query';

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
			eq: 'sp-mtb-samsung',
		},
	},
	pageSize: 99,
	currentPage: 1,
};

async function fetchProductSaleDataSamSungMTB() {
	const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const data = await response.json();
	return data.data.DailySales.items;
}

export const useProductSaleDataSamSungMTB = () => {
	return useQuery({
		queryKey: ['fetchProductSaleDataSamSungMTB'],
		queryFn: fetchProductSaleDataSamSungMTB,
		staleTime: 5000,
	});
};
