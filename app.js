var exec = require('child_process').exec;
var RefCounter = require('./refCounter.js');


function scan(repo){
	var ref = new RefCounter(2,function (){
		exec('cd '+repo+'; ./bin/merge.sh > tmp/commit')
	})
	// run both log and stats at the same time.
	exec('cd '+repo+'; ./bin/log.sh > tmp/logs.json', function (err, output){
		if(err){
			console.log(err);
			return;
		}
		ref.call();
	});

	exec('cd '+repo+'; ./bin/stats.sh > tmp/stats.json',function (err, output){
		if(err){
			console.log(err);
			return;
		}
		ref.call();
	});
}