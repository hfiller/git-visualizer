define(function(require, exports, module) {
	var React = require('react');
	var Slider = require('rc-slider');
	var actions = require('../actions/actions.js');
	
	class TimeSlider extends React.Component{
		constructor(props){
			super(props);
		};

		log(value){
			actions.updateCurrentIndex(value);
		}

		render(){
			return (<Slider dots step={1} value={this.props.currentIndex} max={this.props.commitCount} onChange={this.log} />)
		}
	}
	module.exports = TimeSlider;
});