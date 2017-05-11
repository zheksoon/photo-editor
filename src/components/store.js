import {
	observable,
	computed,
	autorun,
} from 'mobx';

export default observable({
	canvas: 	observable.box(null),
	texture: 	observable.box(null),
	isFileOpened: false,
	activeFilter: null,
	activeFilterParams: [],

})
