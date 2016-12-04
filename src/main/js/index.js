'use strict';

const React = require('react');
const ReactDOM = require('react-dom')
const when = require('when');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const stompClient = require('./websocket-listener');

import myApp from './containers/myApp';

const root = '/api';

class App extends React.Component {

	componentDidMount() {

	}

	render() {
		//debugger;
		return (
			<div> Hello world!!asdsd
				<myApp></myApp>
				<Test>12345</Test>
			</div>
		)
	}
}
class Test extends React.Component {

	

	render() {
		
		return (
			<div>
				 Hello from testApp!!  
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

