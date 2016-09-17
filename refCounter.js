// reference counter that you need, this should really exist
function RefCounter(count, callback, error){
	this.count = count;
	this.complete = callback;
	this.error = error;
}

RefCounter.prototype.call = function (){
	if(!this.count || this.count <= 0){
		console.log("this should never happen");
		return;
	}
	console.log(this.count);
	this.count--;
	if(!this.count){
		this.complete();
	}
}

module.exports = RefCounter;