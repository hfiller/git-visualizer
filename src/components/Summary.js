define(function(require, exports, module) {
	var React = require('react');
	var actions = require('../actions/actions.js');
	var Store = require("../stores/store.js");

	class Summary extends React.Component{
		constructor(props){
			super(props);
			actions.loadRepo(this.props.repo);
			this.state = Store.getState();
		};
		
		setLocalState(newState) {
			var localUpdate = {};
			var keys = Object.keys(newState);
			for (var i = keys.length - 1; i >= 0; i--) {
				localUpdate[keys[i]] = {$set:newState[keys[i]]};
			}
			this.setState(update(this.state, {local: localUpdate}));
		}

		componentDidMount(){
			Store.addChangeListener(this._onChange = this._onChange.bind(this));
		}

		componentWillUnmount() {
			Store.removeChangeListener(this._onChange);
		}

		/**
		* Event handler for 'change' events coming from the TodoStore
		*/
		_onChange() {
			this.setState(Store.getState());
		}

		render(){
			this.state
			return (<div>testing</div>);
		}
	}
	module.exports = Summary;
});