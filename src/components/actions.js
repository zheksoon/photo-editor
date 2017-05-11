import { action, autorun } from 'mobx';

import store from './store';

import filtersConfig from '../config/filters';

import download from 'downloadjs';

const allFilters = filtersConfig.groups.reduce((acc, group) => acc.concat(group.filters), []);

export const setImage = action((image) => {
	var canvas = window.fx.canvas();
	var texture = canvas.texture(image);

	canvas.draw(texture).update();

	store.isFileOpened = true;
	store.canvas.set(canvas);
	store.texture.set(texture);
})

function updateCanvas() {
	if (!store.isFileOpened) return;

	var canvas = store.canvas.get();
	var texture = store.texture.get();
	var activeFilter = store.activeFilter;

	canvas = canvas.draw(texture);

	if (activeFilter) {
		var filterFn = canvas[activeFilter.fn];

		if (filterFn) {
			canvas = filterFn.apply(canvas, store.activeFilterParams)
		} else {
			console.log('Filter is not found');
		}
	}

	canvas.update();
}

export const toggleActiveFilter = action((filterName) => {
	if (filterName && (!store.activeFilter || store.activeFilter.name != filterName)) {
		var filter = allFilters.filter((filter) =>  filter.name == filterName);
		if (filter.length == 0) {
			throw new Error(`Filter ${filterName} is not found`);
		}
		var filterParams = filter[0].params.map((param) => param.defaultValue);

		store.activeFilter = filter[0];
		store.activeFilterParams.replace(filterParams);

		updateCanvas();
	} else if (!filterName || store.activeFilter.name == filterName) {
		store.activeFilter = null;
		store.activeFilterParams.clear();
	}
})

export const setActiveFilterParam = action((index, value) => {
	if (!store.activeFilter) return;
	store.activeFilterParams[index] = value;

	updateCanvas();
})

export const resetActiveFilter = action(() => {
	if (!store.activeFilter) return;
	var filterParams = store.activeFilter.params.map((param) => param.defaultValue);
	store.activeFilterParams.replace(filterParams);

	updateCanvas();
})

export const applyActiveFilter = action(() => {
	var canvas = store.canvas.get();
	var texture = store.texture.get();

	texture.destroy();
	texture = canvas.contents();

	store.texture.set(texture);

	toggleActiveFilter(null);
})

export const saveImage = action(() => {
	var canvas = store.canvas.get();
	var texture = store.texture.get();

	canvas = canvas.draw(texture).update();

	canvas.toBlob((blob) => {
		download(blob, 'image.png', 'image/png');
	}, 'image/png');
})