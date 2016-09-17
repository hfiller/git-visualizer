define(function(require, exports, module) {
	var React = require('react');
	var DoughnutChart = require("react-chartjs").Doughnut;
	
	class Commit extends React.Component{
		constructor(props){
			super(props);
		};

		render(){
			if(!this.props.commit){
				return (<p>ERROR</p>);
			}
			var commitData = [];
			var total = 0;
			var commit = this.props.commit;
			var pathString = "";
			for (var i = 0; i < commit.paths.length; i++) {
				if(pathString)
					pathString+='\n';
				var path = commit.paths[i]
				var insertions = parseInt(path.insertions);
				var deletions = parseInt(path.deletions);
				if(insertions == 0 && deletions == 0){
					insertions = 1;
				}
				pathString += path.path;
				if(insertions){
					pathString += " +"+insertions;
				}
				commitData.push({
					label:path.path,
					value:insertions,
					color:"#0F0"
				})
				if(deletions){
					pathString += " -"+deletions;
				}
				commitData.push({
					label:path.path,
					value:deletions,
					color:"#F00"
				})
				total+= parseInt(insertions)+parseInt(deletions)
			}
			for (var i = 2; i <= commitData.length; i+=2) {
				commitData.splice(i,0,{
					value:(total/100),
					color:"#FFF"
				})
				i++;
			}
			return (
  				<li className="list-group-item">
					<div style={{float:"right"}}>
					<DoughnutChart
						width="100"
						height="50"
						data={commitData}
					/>
					</div>
					<p>{commit.message.split("-").join(" ")}</p>
					<p>{commit.author.split('<')[0]}</p>
					<p>{commit.date}</p>
					<p>{pathString}</p>
				</li>)
		}
	}
	module.exports = Commit;
});