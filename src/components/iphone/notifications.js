// import preact
import { h, render, Component } from 'preact';
// import stylesheets for notifications page
import style from './notifications-style';
// import scrollbars from preact custom scrollbars
import { Scrollbars } from 'preact-custom-scrollbars';
// import jquery for API calls
import $, { ajaxSettings } from 'jquery';

export default class Notifications extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// function call to fetch API data
		this.fetchWeatherDataNotification();
		// set states for all of the arrays
		this.setState({temper:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({cloudiness:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({windSp:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
	}

	// a call to fetch weather data via openweather
	fetchWeatherDataNotification = () => {
		// API URL with a structure of : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&metric={metric}&appid={API key}
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1258&units=metric&exclude=alerts,minutely&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseNotification,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the Notifications component
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

		// creation of days array for the notifications map
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		// display all notifications data
		return (
			<div class={ style.container } style={containerColor}>
			<h1 class={ style.header }>Hiking notifications</h1>
			<h4 class ={style.sub1}>Recommended days</h4>
			<ul class ={style.recommended}>
			{/* In here we use a map to loop through every day and check all of the data for each day so that it can be returned when it meets the set parameters. */ }
			{days.map((day, index) => {
				if (this.state.temper[index] > 10 && this.state.cloudiness[index] < 70 && this.state.windSp[index] < 12) {
					return <li key={index}><p>On {day} the temperature will be {this.props.celsius ? Math.round(this.state.temper[index]) : Math.round((this.state.temper[index]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}, 
					the cloudiness will be {this.state.cloudiness[index]}% and the wind speed will be {this.state.windSp[index]}m/s.</p></li>
				}
				})}
			</ul>
			<h4 class ={style.sub2}>Non-recommended days</h4>
			<ul class ={style.unrecommended}>
			{days.map((day, index) => {
				if (this.state.temper[index] < 5 && this.state.cloudiness[index] >= 70 && this.state.windSp[index] > 20 ) {
					return <li key={index}><p>Alert: It will be cold, very cloudy and windy on {day}.</p></li>
				}
				else if (this.state.temper[index] < 5 && this.state.windSp[index] > 20) {
					return <li key={index}><p>Alert: It will be cold and very windy on {day}.</p></li>
				}
				else if (this.state.temper[index] < 5 && this.state.cloudiness[index] >= 70) {
					return <li key={index}><p>Alert: It will be cold and very cloudy on {day}.</p></li>
				}
				else if (this.state.cloudiness[index] >= 70 && this.state.windSp[index] > 20) {
					return <li key={index}><p>Alert: It will be cold and very cloudy on {day}.</p></li>
				}
				else if (this.state.temper[index] < 5) {
					return <li key={index}><p>Alert: It will be cold on {day}.</p></li>
				}
				else if (this.state.cloudiness[index] >= 70) {
					return <li key={index}><p>Alert: It will be very cloudy on {day}.</p></li>
				}
				else if (this.state.windSp[index] > 20) {
					return <li key={index}><p>Alert: It will be very windy on {day}.</p></li>
				}
				})}
			</ul>
			</div>
		);
	}
	// function to set API values to variables for the notifications page
	parseResponseNotification = (parsed_json) => {
		var i;
		var temperature=[];
		var cloudy=[];
		var windSpeed=[];

		for(i=0; i<7; i++){
			temperature.push(parsed_json['daily'][i]['temp']['day']);
			cloudy.push(parsed_json['daily'][i]['clouds']);
			windSpeed.push(parsed_json['daily'][i]['wind_speed']);
		}

		// set states for fields so they could be rendered later on
		this.setState({
			temper : temperature,
			cloudiness : cloudy,
			windSp : windSpeed,
		});
	}
}
