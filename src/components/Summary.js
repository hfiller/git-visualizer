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

			this.cd = [];
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

		createSpace(distance){
			var distanceElements = []
			for (var i = 0; i < distance; i++) {
				distanceElements.push(<span key={i} style={{marginRight:"20px"}}>{" "}</span>);
			}
			return (<span>{distanceElements}</span>)
		}

		createPath(path,isNew,modifyCount){
			var createdPaths = [];
			path = path.split('/');
			for (var i = 0; i < (path.length - 1); i++) {
				var spacing = {};
				spacing.width = (i*5)+"px";
				var dir = path[i];
				if(i > this.cd.length){
					this.cd.push(dir);
					createdPaths.push(<li key={this.cd.join('/')} className="list-group-item active">{this.createSpace(i)}{dir}</li>);
					continue
				}
				if(dir != this.cd[i]){
					createdPaths.push(<li key={this.cd.join('/')+dir} className="list-group-item active">{this.createSpace(i)}{dir}</li>);
					this.cd.length = i;
				}
			}
			if(modifyCount){
				var modifiedBadge = (<span className="badge">{modifyCount}</span>)
			}
			var fileDrescriptor = (isNew)?"list-group-item list-group-item-success":"list-group-item";
			createdPaths.push(<li key={path.join('/')} className={fileDrescriptor} >{modifiedBadge}{this.createSpace(i)}{path.pop()}</li>);
			this.cd = path;
			return createdPaths;
		}

		renderPaths(allPaths,newPaths){
			allPaths = allPaths.sort();
			var renderPaths = [];

			var previous = allPaths[0];
			var isNew = false;
			var repeatCount = 0;
			var path;
			for (var i = 1; i < allPaths.length + 1; i++) {
				if(allPaths.length != i){
					path = allPaths[i];
				}
				if(path == previous){
					repeatCount++;
					continue;
				}
				var previousPaths = this.createPath(previous,(newPaths.indexOf(previous) > -1),repeatCount);
				renderPaths = renderPaths.concat(previousPaths);
				repeatCount = 0;
				previous = path;
			}
			return (<ul className="list-group" style={{border:"40px",height:"100%", overflowY:"scroll",paddingTop:"40px"}}>{renderPaths}</ul>);
		}

		playRepo(){
			if(this.stop){
				clearInterval(this.stop);
			} else {
				this.stop = setInterval(()=>{
					if(this.state.commitIndex == this.state.repositories[this.state.repositoryName].length){
						return clearInterval(this.stop);
					}
					actions.updateCurrentIndex(this.state.commitIndex+1);
				},1000);
			}
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

			var commits = [];
			var paths = [];
			var newPaths;
			var commitCount = repo.length;

			repo.map((commit, index)=>{
				if(commitCount - index -2 < this.state.commitIndex){
					// these commits are considered in the folder structure.
					commits.push(<Commit key={index} commit={commit}/>)
					if(!commit.paths){
						return;
					}
					paths = paths.concat(commit.paths.map((path)=>{
						return path.path;
					}));
					if(!newPaths) newPaths = paths.slice(0);
				}
			});
			paths = paths.sort();

			return (
				<div>
				<div style={{height:"100%",width:"20%","float":"left"}}>
				<ul className="List-group" style={{width:"300px", overflowY:"scroll",height:"100%"}}>
					{commits}
				</ul>
				</div>
				<div style={{float:"left",width:"80%",height:"100%", padding:"40px"}}>
				<span className="glyphicon glyphicon-play" style={{marginTop:"-25px"}} aria-hidden="true" onClick={this.playRepo.bind(this)}></span>
				<TimeSlider currentIndex={this.state.commitIndex} commitCount={this.state.repositories[this.state.repositoryName].length}/>
					{this.renderPaths(paths,newPaths)}
				</div>
				</div>);
		}
	}
	module.exports = Summary;
});