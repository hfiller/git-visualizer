define(function(require, exports, module) {
	var React = require('react');
	var ReactDOM = require('react-dom');
	var ReactRouter = require("react-router");
	var Route = ReactRouter.Route;
	var Router = ReactRouter.Router;
	var MuiThemeProvider = require("material-ui/styles/MuiThemeProvider").default;
	var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
	var injectTapEventPlugin = require("react-tap-event-plugin");

	//require('../node_modules/rc-slider/assets/index.css');
	var Summary = require('./components/Summary.js');

	/**
	 * Container for the actual content.
	 * A Header could live here that would span all pages.
	 */
	var App = React.createClass({
		render: function render() {
			if(this.props.children){
				return (
					<MuiThemeProvider muiTheme={getMuiTheme()}>
						<div className="wrapper">
								{this.props.children}
						</div>
					</MuiThemeProvider>
				);
			}
			return (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<Summary />
				</MuiThemeProvider>)
		}
	});

	/**
	 * Actual router that makes all the things go to all the right places
	 */
	var routes = (
		<Route path="/" component={App}>
			<Route path="repo/" component={App}/>
		</Route>
	);
	injectTapEventPlugin();
	/**
	 * Load config file from server first
	 * might be used later for deployment-specific config.
	 */
	ReactDOM.render(<Router history={ReactRouter.hashHistory}>{routes}</Router>,document.getElementById('content'));
});