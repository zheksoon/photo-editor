import React, { PureComponent } from 'react';

import { observer } from 'mobx-react';

import filtersConfig from '../../config/filters';

import store from '../store';
import { 
	toggleActiveFilter,
	setActiveFilterParam,
	resetActiveFilter,
	applyActiveFilter,
	saveImage,
} from '../actions';

import './index.css';

const Filter = observer(class Filter extends PureComponent {

	constructor() {
		super();
		this.handleFilterHeaderClick = this.handleFilterHeaderClick.bind(this);
		this.handleParamsChange = this.handleParamsChange.bind(this);
		this.handleFilterApply = this.handleFilterApply.bind(this);
		this.handleFilterReset = this.handleFilterReset.bind(this);
	}

	handleFilterHeaderClick() {
		toggleActiveFilter(this.props.filter.name);
	}

	handleParamsChange(index, event) {
		var value = parseFloat(event.target.value);
		setActiveFilterParam(index, value);
	}

	handleFilterApply() {
		applyActiveFilter();
	}

	handleFilterReset() {
		resetActiveFilter();
	}

	render() {
		var {
			name,
			fn,
			params,
		} = this.props.filter;

		return (
			<div className={"filter " + (this.props.active ? "active" : "")}>
				<p onClick={this.handleFilterHeaderClick}>{name}</p>
				{ this.props.active && 
					<div>
						<table className="filterParams">
							<tbody>
							{ params.map(({ name, minValue, maxValue, defaultValue }, i) => (
								<tr key={name}>
									<td className="filter-name">
										{name}:
									</td>
									<td className="filter-min">
										{minValue}
									</td>
									<td className="filter-param">
										<input 
											type="range" 
											min={minValue} 
											max={maxValue} 
											value={store.activeFilterParams[i]} 
											step={(maxValue - minValue) / 100}
											onChange={this.handleParamsChange.bind(this, i)}
										/>
									</td>
									<td className="filter-max">
										{maxValue}
									</td>
								</tr>
							)) }
							</tbody>
						</table>
						<div className="filter-actions">
							<button 
								className="action-apply"
								onClick={this.handleFilterApply}
							>Apply</button>
							<a 
								href="#" 
								className="action-reset"
								onClick={this.handleFilterReset}
							>Reset</a>
						</div>
					</div>
				}
			</div>
		)
	}
})

const FilterGroup = observer((props) => {
	var { name, filters } = props.group;

	return (
		<div className="filter-group">
			<b>{name}</b>
			{ filters.map((filter) => (
				<Filter
					key={filter.name}
					filter={filter} 
					active={store.activeFilter && store.activeFilter.name == filter.name} 
				/>
			)) }
		</div>
	)
})

export const FiltersContainer = () => {

	return (
		<div className="filters-container">
			<h2>Filters</h2>
			{ filtersConfig.groups.map((group) => (
				<FilterGroup 
					key={group.name}
					group={group} 
				/>
			)) }

			<div className="save-button-wrapper">
				<button id="save-button" onClick={saveImage}>Save</button>
			</div>
		</div>
	)
}