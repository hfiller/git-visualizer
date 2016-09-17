// reference counter that you need, this should really exist
function RefCounter(count, callback, error){
	this.count = count - 1;
	this.callback = callback;
	this.error = error;
}

RefCounter.prototype.call = function (){
	if(!this.count || this.count <= 0){
		console.log("this should never happen");
		return;
	}
	this.count--;
	if(!this.count){
		this.complete();
	}
}

module.exports = RefCounter;