var exec = require('child_process').exec;
var RefCounter = require('./refCounter.js');
var jsonfile = require('jsonfile')

/**
 * scan
 * scans a directory
 * @param {String} relative directory.
 */
function scan(repo){
	var ref = new RefCounter(2,function (){
		var logs = require("./tmp/logs.json")
		var stats = require("./tmp/stats.json")
		logs.map(function(log){
			log.paths = stats[log.commit];
		});
		jsonfile.writeFile("public/repos/"+repo+".json",logs, function (err) {
			if(err){
				console.error(err);
			}
		})
	});
	// run both log and stats at the same time.
	exec('./bin/log.sh > tmp/logs.json', function (err, output){
		if(err){
			console.log("error");
			console.log(err);
			return;
		}
		console.log(output);
		ref.call();
	});
	// asynchronousity is awesome.
	exec('./bin/stats.sh > tmp/stats.json',function (err, output){
		if(err){
			console.log("error");
			console.log(err);
			return;
		}
		console.log(output);
		ref.call();
	});
}
scan("test-repo");