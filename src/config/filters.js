export default {
	groups: [{
		name: 'Adjust',
		filters: [{
			name: 'Brightness / Contrast',
			fn: 'brightnessContrast',
			params: [{
				name: 'Brightness',
				minValue: -1.0,
				maxValue: 1.0,
				defaultValue: 0.0,
			}, {
				name: 'Contrast',
				minValue: -1.0,
				maxValue: 1.0,
				defaultValue: 0.0,
			}]
		}, {
			name: 'Hue / Saturation',
			fn: 'hueSaturation',
			params: [{
				name: 'Hue',
				minValue: -1.0,
				maxValue: 1.0,
				defaultValue: 0.0,
			}, {
				name: 'Saturation',
				minValue: -1.0,
				maxValue: 1.0,
				defaultValue: 0.0,
			}]
		}, {
		// 	name: 'Curves',
		// 	fn: 'curves',
		// }, {
			name: 'Denoise',
			fn: 'denoise',
			params: [{
				name: 'Strength',
				minValue: 0,
				maxValue: 50,
				defaultValue: 10,
			}]
		}, {
			name: 'Unsharp mask',
			fn: 'unsharpMask',
			params: [{
				name: 'Radius',
				minValue: 0.0,
				maxValue: 30,
				defaultValue: 5,
			}, {
				name: 'Strength',
				minValue: 0.0,
				maxValue: 5.0,
				defaultValue: 2.0,
			}]
		}]
	}, {
		name: 'Blur',
		filters: [{
		// 	name: 'Zoom blur',
		// 	fn: 'zoomBlur',
		// 	params: [{
		// 		name: 'X',
		// 		minValue: 0.0,
		// 		maxValue: 1.0,
		// 		defaultValue: 0.5,
		// 	}, {
		// 		name: 'Y',
		// 		minValue: 0.0,
		// 		maxValue: 1.0,
		// 		defaultValue: 0.5,
		// 	}, {
		// 		name: 'Strength',
		// 		minValue: 0.0,
		// 		maxValue: 1.0,
		// 		defaultValue: 0.2,
		// 	}]
		// }, {
			name: 'Triangle blur',
			fn: 'triangleBlur',
			params: [{
				name: 'Radius',
				minValue: 0.0,
				maxValue: 50.0,
				defaultValue: 5.0,
			}]
		}]
	}]
}