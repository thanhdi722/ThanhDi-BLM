import React, { useEffect, useRef } from 'react';
import './wave.scss';

class Animation {
	el: SVGSVGElement;
	paths: NodeListOf<SVGPathElement>;
	offset: number;
	baseHeight: number;
	duration: number;
	vOffset: number;

	constructor(el: SVGSVGElement) {
		this.el = el;
		this.paths = el.querySelectorAll('path');
		this.offset = 15;
		this.baseHeight = 66.66;
		this.duration = 250;
		this.vOffset = 5;
	}

	render() {
		const delta = Date.now();
		const d = Math.sin(delta / this.duration);

		this.paths.forEach((path, i) => {
			const height = this.baseHeight + i * this.vOffset;
			const str = `M 0 ${height} C 50 ${height + this.offset * d} 50 ${
				height - this.offset * d
			} 100 ${height} V 100 H 0`;
			path.setAttribute('d', str);
		});
	}

	renderLoop() {
		this.render();
		requestAnimationFrame(() => {
			this.renderLoop();
		});
	}
}

const Wave: React.FC = () => {
	const overlayRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (overlayRef.current) {
			const overlay = new Animation(overlayRef.current);
			overlay.renderLoop();
		}
	}, []);

	return (
		<div>
			<svg ref={overlayRef} className='shape-overlay' viewBox='0 0 100 300' preserveAspectRatio='none'>
				<path className='shape-overlay__path' />
				<path className='shape-overlay__path' />
				<path className='shape-overlay__path' />
				{/* <path className='shape-overlay__path' /> */}
			</svg>
		</div>
	);
};

export default Wave;
