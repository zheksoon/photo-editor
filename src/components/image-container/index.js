import React, { Component, PureComponent } from 'react';
import { untracked } from 'mobx';
import { observer } from 'mobx-react';

import './index.css';

import store from '../store';

import { setImage } from '../actions';

class ImageDisplay extends Component {

	constructor() {
		super();
		this.imageDisplay = null;
	}

	componentDidMount() {
		untracked(() => {
			var canvas = store.canvas.get();
			if (canvas !== null) {
				this.imageDisplay.appendChild(canvas);
			}
		})
	}

	render() {
		return (
			<div className="image-display" ref={(el) => this.imageDisplay = el}>

			</div>
		)
	}
}

const ImageContainer = observer(class ImageContainer extends PureComponent {
	constructor() {
		super();
		this.imageInput = null;
		this.imageDisplay = null;
		this.canvas = null;

		this.handleOpenImageClick = this.handleOpenImageClick.bind(this);
		this.handleImageOpen = this.handleImageOpen.bind(this);
	}

	handleOpenImageClick() {
		if (this.imageInput) {
			this.imageInput.click();
		}
	}

	handleImageOpen() {
		var image = new Image();
		image.onload = function(e) {
			setImage(image);
		}
		image.src = URL.createObjectURL(this.imageInput.files[0]);
	}

	render() {
		return (
			<div className="image-container">
			{ store.isFileOpened 
				? <ImageDisplay />
				: <div className="open-image">
					<h3>Open Image</h3>
					<a href="#" onClick={this.handleOpenImageClick}>
						<img src="img/drag-drop.png" alt="" />
					</a>
					<input
						type="file"
						accept="image/*" 
						hidden="true"
						ref={(input) => { this.imageInput = input}}
						onChange={this.handleImageOpen}
					/>
				</div>
			}
			</div>
		)
	}
});

export default ImageContainer;