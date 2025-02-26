import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import './promotion-new-year.scss';
import Link from 'next/link';

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

type PromotionProps = {
	onScrollToRules: () => void;
};

const Promotion = ({ onScrollToRules }: PromotionProps) => {
	const [data, setData] = useState<ApiResponse | null>(null);

	const fetchBannerHeader = async () => {
		try {
			const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
                  query getSlider($filter: SliderFilterInput) {
                    Slider(filter: $filter) {
                      items {
                        title
                        identifier
                        Banner {
                          __typename
                          items {
                            banner_id
                            caption
                            link
                            media
                            media_alt
                            name
                            slider_id
                          }
                          page_info {
                            current_page
                            page_size
                            total_pages
                          }
                        }
                      }
                      total_count
                    }
                  }
                `,
					variables: {
						filter: {
							identifier: {
								eq: 'banner-mung-nam-moi',
							},
						},
					},
				}),
			});

			const result = await response.json();
			setData(result);
		} catch (err) {
			console.error('Error fetching data', err);
		}
	};

	useEffect(() => {
		fetchBannerHeader();
	}, []);

	return (
		<div className='promotion-new-year'>
			<div className='container'>
				<div className='promotion-new-year-header'>
					{`${
						data?.data?.Slider?.items[0]?.Banner?.items.filter((item) =>
							item.name.includes('Ưu Đãi Mừng Năm Mới')
						).length
					} đặc quyền mua hàng tại `}
					<span style={{ fontWeight: 700 }}>Bạch Long Mobile</span>
				</div>
				<div className='promotion-new-year-list-privilege'>
					{data?.data?.Slider?.items[0]?.Banner?.items
						.filter((item) => item.name.includes('Ưu Đãi Mừng Năm Mới'))
						.map((item, index) => (
							<div key={index} className='privilege-img' style={{ cursor: 'pointer' }}>
								{item.link ? (
									<Link href={item.link} target='_blank' rel='noopener noreferrer'>
										<Image
											src={item.media || ''}
											alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
											width={1200}
											height={1000}
										/>
									</Link>
								) : (
									<div
										onClick={() =>
											document
												.getElementById('item-rules')
												?.scrollIntoView({ behavior: 'smooth' })
										}
									>
										<Image
											src={item.media || ''}
											alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
											width={1200}
											height={1000}
										/>
									</div>
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Promotion;
