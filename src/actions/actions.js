define(function(require, exports, module) {
	var ReactRouter = require("react-router");
	var AppDispatcher = require("../Dispatcher.js");

	class Actions{
		// actions go here
		loadRepo(repo){
			repo = repo || "test-repo";
			console.log(repo);
			$.ajax({
				"url": "/repos/"+repo+".json",
					"method": "GET"
				}).done(function (response) {
					console.log(response);
					AppDispatcher.dispatch({
						type:"NEW_REPO",
						payload:response,
						meta:repo
					});
				}
			);
		}

		updateCurrentIndex(index){
			AppDispatcher.dispatch({
				type:"COMMIT_INDEX",
				payload:index
			});
		}
	}

	module.exports = new Actions();
});