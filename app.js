var exec = require('child_process').exec;


var ref = new RefCounter(2,)
// run both log and stats at the same time.
exec("./bin/log.sh  > tmp/logs.json", function (err, output){
	console.log(arguments);
});

exec('./bin/stats.sh > tmp/stats.json',function (err, output){
	console.log(arguments);
});