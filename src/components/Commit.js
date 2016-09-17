define(function(require, exports, module) {
	var React = require('react');
	var DoughnutChart = require("react-chartjs").Doughnut;
	
	class Commit extends React.Component{
		constructor(props){
			super(props);
		};

		colorFunc(input){
			console.log(arguments)
			return (input%2==0)?"#ff0000":"#00ff00";
		}

		render(){
			if(!this.props.commit){
				return (<p>ERROR</p>);
			}
			var commitData = [];
			var total = 0;
			var commit = this.props.commit;
			for (var i = 0; i < commit.paths.length; i++) {
				var path = commit.paths[i]
				if(path.insertions == 0 && path.deletions == 0){
					path.insertions = 1;
				}
				commitData.push({
					label:path.path,
					value:path.insertions,
					color:"#0F0"
				})
				commitData.push({
					label:path.path,
					value:path.deletions,
					color:"#F00"
				})
				total+= parseInt(path.insertions)+parseInt(path.deletions)
			}
			console.log(commitData.length);
			for (var i = 2; i <= commitData.length; i+=2) {
				commitData.splice(i,0,{
					value:(total/100),
					color:"#FFF"
				})
				i++;
			}
			console.log(commitData.length);
			return (<ul className="list-group">
  				<li className="list-group-item">
					<DoughnutChart
						data={commitData}
						options={{
							datasets: {
								label: "NFL Chart",
								fillColor: "rgba(220,220,220,0.2)",
								strokeColor: "rgba(220,220,220,1)",
								pointColor: "rgba(220,220,220,1)",
								pointStrokeColor: "#000",
								pointHighlightFill: "#000",
								pointHighlightStroke: "rgba(220,220,220,1)"
							}
						}}
					/>
				<p>{commit.message.split("-").join(" ")}</p>
				<p>{commit.author.split('<')[0]}</p>
				<p>{commit.date}</p>
				</li>
				</ul>)
		}
	}
	module.exports = Commit;
});