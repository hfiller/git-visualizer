define(function(require, exports, module) {
	var React = require('react');
	var actions = require('../actions/actions.js');
	var Store = require("../stores/store.js");

	var Commit = require("./Commit.js");
	var TimeSlider = require("./TimeSlider.js");
	class Summary extends React.Component{
		constructor(props){
			super(props);
			actions.loadRepo(this.props.repo);
			this.state = Store.getState();
			this.state.local = {};
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
			var commits = [];
			var commitCount = this.state.repositories[this.state.repositoryName].length;
			this.state.repositories[this.state.repositoryName].map((commit, index)=>{
				if(commitCount - index -2 < this.state.commitIndex){
					// these commits are considered in the folder structure.
					commits.unshift(<Commit key={index} commit={commit}/>)

				}
			})
			return commits;
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
			return (
				<div>
				<div style={{height:"100%",width:"20%","float":"left"}}>
				<ul className="List-group" style={{width:"300px", overflowY:"scroll",height:"100%"}}>
					{this.renderCommits()}
				</ul>
				</div>
				<div style={{float:"left",width:"80%",height:"100%", padding:"40px"}}>
				<TimeSlider currentIndex={this.state.commitIndex} commitCount={this.state.repositories[this.state.repositoryName].length}/>
				</div>
				</div>);
		}
	}
	module.exports = Summary;
});