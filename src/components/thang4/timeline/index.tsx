import React, { useState, useEffect } from 'react';
import CloudNewYear from '../../../../public/new-year/cloud-new-year.png';
import BgTimeLine from '../../../../public/new-year/bg-time-line.png';
import Image from 'next/image';
import './timeline.scss';

interface TimeLineProps {
	onScrollToRules: () => void;
}

const TimeLine: React.FC<TimeLineProps> = ({ onScrollToRules }) => {
	const [endDate, setEndDate] = useState(new Date('2024-12-31T21:30:00'));
	const [timeArray, setTimeArray] = useState([
		{ date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
	]);
	const [isEventOver, setIsEventOver] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const timeDiff = endDate.getTime() - now.getTime();

			if (timeDiff <= 0) {
				setIsEventOver(true);
				clearInterval(interval);
				return;
			}

			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

			setTimeArray([{ date: endDate.toDateString(), days, hours, minutes, seconds }]);
		}, 1000);

		return () => clearInterval(interval);
	}, [endDate]);

	return (
		<div className='timeline-new-year'>
			{/* <Image src={CloudNewYear} alt='bg-time-line' className='cloud-new-year' /> */}
			<div className='container'>
				{isEventOver ? (
					<div className='HeaderHalloween-time-line'>
						<p
							className='HeaderHalloween-time-line-end-text'
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '40px 0px',
								color: '#fff',
								fontSize: '32px',
								fontWeight: '600',
							}}
						>
							Hết thời gian sự kiện
						</p>
					</div>
				) : (
					<div className='HeaderHalloween-time-line'>
						<div className='HeaderHalloween-time-line-container'>
							<div className='HeaderHalloween-time-line-card-container'>
								<Image src={BgTimeLine} alt='bg-time-line' className='bg-time-line' />
								{timeArray.map((time, index) => (
									<div className='HeaderHalloween-time-line-card-key' key={index}>
										<div className='HeaderHalloween-time-line-card'>
											<div className='content-card'>
												<p className='HeaderHalloween-time-line-count'>{`${time.days} `}</p>
												<p className='HeaderHalloween-time-line-subtext'>Ngày</p>
											</div>
										</div>
										<div className='HeaderHalloween-time-line-card'>
											<div className='content-card'>
												<p className='HeaderHalloween-time-line-count'>{`${time.hours} `}</p>
												<p className='HeaderHalloween-time-line-subtext'>Giờ</p>
											</div>
										</div>
										<div className='HeaderHalloween-time-line-card'>
											<div className='content-card'>
												<p className='HeaderHalloween-time-line-count'>{`${time.minutes} `}</p>
												<p className='HeaderHalloween-time-line-subtext'>Phút</p>
											</div>
										</div>
										<div className='HeaderHalloween-time-line-card'>
											<div className='content-card'>
												<p className='HeaderHalloween-time-line-count'>{`${time.seconds} `}</p>
												<p className='HeaderHalloween-time-line-subtext'>Giây</p>
											</div>
										</div>
									</div>
								))}
							</div>
							<button className='new-year-button' onClick={onScrollToRules}>
								Xem thể lệ
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TimeLine;
