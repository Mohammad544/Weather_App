// import preact
import { h, Component } from 'preact';
//import preact router
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
//import stylesheets for navbar
import style from './app-style'
//import components
import Iphone from './iphone';
import Trails from './iphone/trails';
import Notifications from './iphone/notifications';
import Settings from './iphone/settings';
//import navbar icons
import homeIcon from '../assets/icons/home_icon.png';
import trailsIcon from '../assets/icons/trails_icon.png';
import notificationsIcon from '../assets/icons/notification_icon.png';
import settingsIcon from '../assets/icons/settings_icon.png';


export default class App extends Component {

	constructor(props) {
		super(props);
		// default isCelsius state
		// default background color state
		this.state = {
			isCelsius : true,
			backColor : "blue"
		}
	}

	// function that is responsible for switching the isCelsius state to true -> false / false -> true
	setCelsius = () => {
		this.setState({isCelsius: !this.state.isCelsius})
	}

	setBackgroundBlue = () => {
		this.setState({backColor : "blue"})
	}
	setBackgroundGreen = () => {
		this.setState({backColor : "green"})
	}
	setBackgroundOrange = () => {
		this.setState({backColor : "orange"})
	}
	setBackgroundBlack = () => {
		this.setState({backColor : "black"})
	}

	/*
		render method which is responsible for handling the router and rendering the navigation bar which moves the user around the different components
	*/
	render(){
		return (
			<div id="app">
			{/* Router that defines the different paths for each app page. This is also where we pass the current state of "isCelsius" to the child components so that the temperature unit can change.
				 In the Settings component we also pass down the "setCelsius()" command so that the button in the settings can make that change. 
				 In the Settings component we also pass down the functions that will set the backColor state to the different colors depending on which button is clicked. */}
			<Router>
				<Iphone celsius={ this.state.isCelsius } backgroundColor={ this.state.backColor } path="/" />
				<Trails celsius={ this.state.isCelsius } backgroundColor={ this.state.backColor } path="/trails" />
				<Notifications celsius= { this.state.isCelsius } backgroundColor={ this.state.backColor } path="/notifications" />
				<Settings celsius={this.state.isCelsius} setCelsius={() => this.setCelsius()} backgroundColor={ this.state.backColor } setBlue={() => this.setBackgroundBlue()} setGreen={() => this.setBackgroundGreen()} setOrange={() => this.setBackgroundOrange()} setBlack={() => this.setBackgroundBlack()} path="/settings" />
			</Router>
			{/* navigation bar with the links to each component path */}
			<table className={style.bottomNavBar}>
				<tr>
					<td>
						<Link activeClassName="active" href="/">
							<button style={{backgroundColor: "lightgray", border: "none"}}>
									<img style={{height: "53px"}} src={homeIcon} alt="Home icon"/>
							</button>
							<div class = {style.home}>Home</div>
						</Link>
					</td>
					<td>
						<Link activeClassName="active" href="/trails">
							<button style={{backgroundColor: "lightgray", border: "none"}}>
								<img style={{height: "43px"}} src={trailsIcon} alt="Trails icon"/>
							</button>
							<div class = {style.trails}>Trails</div>
						</Link>
					</td>
					<td>
						<Link activeClassName="active" href="/notifications">
							<button style={{backgroundColor: "lightgray", border: "none"}}>
								<img style={{height: "45px", paddingLeft:"14px"}} src={notificationsIcon} alt="Notifcations icon"/>
							</button>
							<div class = {style.notifications}>Notifications</div>
						</Link>
					</td>
					<td>
						<Link activeClassName="active" href="/settings">
							<button style={{backgroundColor: "lightgray", border: "none"}}>
								<img style={{height: "45px", paddingLeft:"8px"}} src={settingsIcon} alt="Settings icon"/>
							</button>
							<div class = {style.settings}>Settings</div>
						</Link>
					</td>
				</tr>
			</table>
			</div>
		);
		}
	}
