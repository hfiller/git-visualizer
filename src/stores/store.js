define(function(require, exports, module) {
	var AppDispatcher = require("../Dispatcher.js");
	var EventEmitter = require("events").EventEmitter;

	var CHANGE_EVENT = "change";
	class Store extends EventEmitter {
		constructor() {
			super();
			// initialize state
			this.__initialize();

			// subscribe to the App Dispatcher.
			this.__subscribe();
		}

		__initialize() {
			this.current_repo = 'test-repo'
			this.repos = {};
			this.commitIndex = 0;
		}
		
		/**
		 * Subscribes to dispatcher and updates the store based events
		 */
		__subscribe() {
			AppDispatcher.register((event) => {
				console.log(event.type);
				switch(event.type) {
					case "NEW_REPO":
						this.repos[event.meta] = event.payload;
						this.current_repo = event.meta;
						this.commitIndex = Math.floor(event.payload.length/2);
						break;
					case "COMMIT_INDEX":
						this.commitIndex = event.payload;
						break;
					default:
						return;
				}
				this.emit(CHANGE_EVENT);
			});
		}

		/**
		* @param {function} callback
		*/
		addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback);
		}

		/**
		* @param {function} callback
		*/
		removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		}

		/**
		 * Get current state
		 *
		 * @return {Object} state
		 */
		getState() {
			return {
				repositoryName: this.current_repo,
				repositories: this.repos,
				commitIndex: this.commitIndex
			};
		}
	}

	// Templates for store objects
	module.exports = new Store();
});