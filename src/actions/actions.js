define(function(require, exports, module) {
	var ReactRouter = require("react-router");
	var AppDispatcher = require("../Dispatcher.js");

	class Actions{
		// actions go here
		loadRepo(repo){
			repo = repo || "test-repo";
			if(!repo){
				$.ajax({
					"url": "/repos/"+repo+".json",
  					"method": "GET"
  				}).done(function (response) {
  					AppDispatcher.dispatch({
						type:"NEW_REPO",
						payload:response,
						meta:repo
					});
  				});
			}
		}
	}

	module.exports = new Actions();
});