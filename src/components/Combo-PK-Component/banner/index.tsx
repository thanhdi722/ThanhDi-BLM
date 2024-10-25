'use client';
import React from 'react';
import Image from 'next/image';
import bannerPC from '../../../../public/HEAD PK THANG 10 1920x500 0410.jpg';
import bannerMB from '../../../../public/HEADER-MOBILE.jpg';
import './HeaderCombo.scss';
const HeaderCombo = () => {
	return (
		<div>
			<Image src={bannerPC} alt='' className='HeaderCombo-bannerPC' />
			<Image src={bannerMB} alt='' className='HeaderCombo-bannerMB' />
		</div>
	);
};

export default HeaderCombo;
