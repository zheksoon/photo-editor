import React from 'react';
import { observer } from 'mobx-react';

import './app.css';

import store from './store';

import ImageContainer from './image-container/';
import { FiltersContainer } from './filters-container/';

const App = observer(({ props, children }) => {
	return (
		<div className="app-container">
			<ImageContainer />
			{ store.isFileOpened && <FiltersContainer /> }
		</div>
	)
})

export default App;