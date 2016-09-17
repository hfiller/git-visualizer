define(function(require, exports, module) {
	var React = require('react');
	var actions = require('../actions/actions.js');
	var Store = require("../stores/store.js");

	var Commit = require("./Commit.js");

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

		renderCommits(){
			return this.state.repositories[this.state.repositoryName].map((commit)=>{
				return (<Commit key={commit.commit} commit={commit}/>)
			})
		}

		render(){
			if(!this.state || !this.state.repositories[this.state.repositoryName]){
				var style = {
					position: "absolute",
					margin: "auto",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				}
		    	return (<div><img style={style}src="images/ripple.svg"/></div>)
			}
			var repo = this.state.repositories[this.state.repositoryName];
			return (<div>{this.renderCommits()}</div>);
		}
	}
	module.exports = Summary;
});