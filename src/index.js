import React from 'react'; 
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Component/Home';
import DashBoard from './Component/DashBoard';
import './index.css';


render(
		<Router>
		<div>
			<Route exact path="/" component={Home}/>
			<Route exact path="/dashboard" component={DashBoard}/>
		</div>
		</Router>, document.getElementById('root')
);
