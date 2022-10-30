// import preact
import { h, render, Component } from 'preact';
// import stylesheets for settings page
import style from './settings_style';
// import jquery for API calls
import $, { ajaxSettings } from 'jquery';

export default class Settings extends Component {

	// render function for the settings page
	render() {

		// If statements to change the background color of the container.
		var containerColor;
		if (this.props.backgroundColor == "blue") {
			containerColor = {backgroundImage: "linear-gradient(darkslateblue, dodgerblue)" }
		} else if (this.props.backgroundColor == "green") {
			containerColor = {backgroundImage: "linear-gradient(green, darkgreen)" }
		} else if (this.props.backgroundColor == "orange") {
			containerColor = {backgroundImage: "linear-gradient(darkorange, red)" }
		} else if (this.props.backgroundColor == "black") {
			containerColor = {backgroundColor: "black" }
		}

		// If statements used to change the color of the buttons depending on the background color.
		var buttonColor;
		if (this.props.backgroundColor == "blue") {
			buttonColor = {backgroundColor: "dodgerblue"}
		} else if (this.props.backgroundColor == "green") {
			buttonColor = {backgroundColor: "forestgreen"}
		} else if (this.props.backgroundColor == "orange") {
			buttonColor = {backgroundColor: "darkorange"}
		} else if (this.props.backgroundColor == "black") {
			buttonColor = {backgroundColor: "rgb(66, 66, 66)"}
		}

		return (
		<div class={ style.container } style={containerColor}>
		<div class={ style.buttons }>
		<h1 class={ style.header }>Settings</h1>
			<div>
				<p>Switch unit of temperature:</p>
				{/* Button used to control the state of "isCelsius" */}
				<button class= { style.button } onClick={() => this.props.setCelsius()} style={buttonColor} >
					{this.props.celsius ? "Celsius" : "Fahrenheit"}
				</button>
			</div>
			<div>
				<p>Change theme to Blue:</p>
				{/*Button used to change background color to blue */}
				<button class= { style.button } onClick={() => this.props.setBlue()} style={buttonColor} >
					Blue
				</button>
			</div>
			<div>
				<p>Change theme to Green:</p>
				{/*Button used to change background color to green */}
				<button class= { style.button } onClick={() => this.props.setGreen()} style={buttonColor} >
					Green
				</button>
			</div>
			<div>
				<p>Change theme to Orange:</p>
				{/*Button used to change background color to orange */}
				<button class= { style.button } onClick={() => this.props.setOrange()} style={buttonColor} >
					Orange
				</button>
			</div>
			<div>
				<p>Change theme to Black:</p>
				{/*Button used to change background color to black*/}
				<button class= { style.button } onClick={() => this.props.setBlack()} style={buttonColor} >
					Black
				</button>
			</div>
		</div>
		</div>
		)}
}

