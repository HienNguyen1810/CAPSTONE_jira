import React from 'react';

const LoadingPage = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			style={{ margin: 'auto', background: '#fff', display: 'block' }}
			width="247px"
			height="247px"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<defs>
				<filter
					id="ldio-i5fo3wda1-filter"
					x="-100%"
					y="-100%"
					width="300%"
					height="300%"
					colorInterpolationFilters="sRGB"
				>
					<feGaussianBlur
						in="SourceGraphic"
						stdDeviation="2.4000000000000004"
					/>
					<feComponentTransfer result="cutoff">
						<feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1" />
					</feComponentTransfer>
				</filter>
			</defs>
			<g filter="url(#ldio-i5fo3wda1-filter)">
				<g transform="translate(50 50)">
					<g>
						<circle cx={15} cy={0} r={5} fill="#220b09">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="5.5555555555555545s"
								repeatCount="indefinite"
								begin="-0.18000000000000002s"
							/>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="5.5555555555555545s"
							repeatCount="indefinite"
							begin="0s"
						/>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle cx={15} cy={0} r={5} fill="#d34c31">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="2.7777777777777772s"
								repeatCount="indefinite"
								begin="-0.14400000000000002s"
							/>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="2.7777777777777772s"
							repeatCount="indefinite"
							begin="-0.036000000000000004s"
						/>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle cx={15} cy={0} r={5} fill="#e88432">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="1.8518518518518516s"
								repeatCount="indefinite"
								begin="-0.10800000000000001s"
							/>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="1.8518518518518516s"
							repeatCount="indefinite"
							begin="-0.07200000000000001s"
						/>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle cx={15} cy={0} r={5} fill="#ff312d">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="1.3888888888888886s"
								repeatCount="indefinite"
								begin="-0.07200000000000001s"
							/>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="1.3888888888888886s"
							repeatCount="indefinite"
							begin="-0.10800000000000001s"
						/>
					</g>
				</g>
				<g transform="translate(50 50)">
					<g>
						<circle cx={15} cy={0} r={5} fill="#f5c037">
							<animate
								attributeName="r"
								keyTimes="0;0.5;1"
								values="3.5999999999999996;8.399999999999999;3.5999999999999996"
								dur="1.111111111111111s"
								repeatCount="indefinite"
								begin="-0.036000000000000004s"
							/>
						</circle>
						<animateTransform
							attributeName="transform"
							type="rotate"
							keyTimes="0;1"
							values="0;360"
							dur="1.111111111111111s"
							repeatCount="indefinite"
							begin="-0.14400000000000002s"
						/>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default LoadingPage;
