import React, { useState } from 'react';
const ImageEditor = (props) => {
	const [topText, setTopText] = useState('');
	const [bottomText, setBottomText] = useState('');

	const convertToImage = () => {
		//getting the SVG data
		const svg = document.querySelector('svg');
		let xml = new XMLSerializer().serializeToString(svg);

		//making it base64
		const svg64 = btoa(unescape(encodeURIComponent(xml)));
		const b64Start = 'data:image/svg+xml;base64,';
		const image64 = b64Start + svg64;

		//creating canvas
		const canvas = document.createElement('canvas');
		canvas.setAttribute('id', 'canvas');

		//setting canvas heigth and width based on svg
		const svgSize = svg.getBoundingClientRect();
		canvas.width = svgSize.width;
		canvas.height = svgSize.height;

		//creaing img
		const img = document.createElement('img');
		img.setAttribute('src', image64);

		img.onload = () => {
			canvas.getContext('2d').drawImage(img, 0, 0);
			const canvasdata = canvas.toDataURL('image/png');
			const a = document.createElement('a');
			a.download = 'meme.png';
			a.href = canvasdata;
			document.body.appendChild(a);
			a.click();
		};
	};

	return (
		<div>
			<div className="container">
				<div className="columns">
					<div className="column is-four-fifths">
						<svg
							height="600"
							width="600"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<image height="600" width="600" href={props.imgURL} />
							<text
								x="50%"
								y="10%"
								textAnchor="middle"
								dominantBaseline="middle"
								style={textStyle}
							>
								{topText}
							</text>
							<text
								x="50%"
								y="90%"
								textAnchor="middle"
								dominantBaseline="middle"
								style={textStyle}
							>
								{bottomText}
							</text>
						</svg>
					</div>

					<div className="column">
						<form>
							<div className="field">
								<label className="label"> top text</label>
								<div className="control">
									<input
										className="input"
										type="text"
										value={topText}
										onChange={(e) => setTopText(e.target.value)}
									/>
								</div>
							</div>

							<div className="field">
								<label className="label">bottom text</label>
								<input
									className="input"
									type="text"
									value={bottomText}
									onChange={(e) => setBottomText(e.target.value)}
								/>
							</div>
						</form>
						<button
							className="button is-primary is-light"
							onClick={() => convertToImage()}
						>
							download meme
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const textStyle = {
	fontFamily: 'Impact',
	fontSize: '50px',
	textTransform: 'uppercase',
	fill: '#FFF',
	stroke: '#000',
	userSelect: 'none',
};
export default ImageEditor;
