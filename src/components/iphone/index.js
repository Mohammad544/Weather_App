// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone
import style from './style';
// import jquery for API calls
import $, { ajaxSettings } from 'jquery';
// import the Scrollbars from custom scrollbars library
import { Scrollbars } from 'preact-custom-scrollbars';
//importing icons from assets folder
import humidity from '../../assets/icons/humidity.png';
import windSpeed from '../../assets/icons/wind.png';
import cloudiness from '../../assets/icons/cloudy.png';

export default class Iphone extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// functions calls to fetch API data
		this.fetchWeatherData();
		this.fetchWeatherDataCurrentInfo();
		this.fetchWeatherDataFuture();
		// set initial values for the arrays
		this.setState({temper:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({cloudiness:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({windSp:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({hum:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({iconFutureArr:["NULL","NULL","NULL","NULL","NULL","NULL","NULL"]});
		this.setState({tempH:["NULL","NULL","NULL"]});
	}

	// a call to fetch weather data via openweather
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// a call to fetch weather data via openweather
	fetchWeatherDataFuture = () => {
		// API URL with a structure of : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&metric={metric}&appid={API key}
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1258&units=metric&exclude=alerts,minutely&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseFuture,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// a call to fetch weather data via openweather
	fetchWeatherDataCurrentInfo = () => {
		// API URL with a structure of : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&metric={metric}&appid={API key}
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1258&units=metric&exclude=alerts,minutel&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseCurrentInfo,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the iphone component
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

		// display all weather data. This is also where we use the "celsius" prop that is passed down from app.js in order to make the change between celsius and fahrenheit.
		return (
			<div class={ style.container } style={containerColor}>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div class={ style.temperature }>{this.props.celsius ? Math.round(this.state.temp) : Math.round((this.state.temp * 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</div>
					<div class = { style.MEN }>
						<table style={{float:"right"}}>
							<tr class={ style.morningTemp }>
								<th scope = "col">Morning</th>
								<td>{ this.props.celsius ? Math.round(this.state.tempH[0]) : Math.round((this.state.tempH[0]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
							</tr>
							<tr>
								<th scope = "col">Evening</th>
								<td>{ this.props.celsius ? Math.round(this.state.tempH[1]) : Math.round((this.state.tempH[1]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
							</tr>
							<tr  class={ style.nightTemp }>
								<th scope = "col">Night</th>
								<td>{ this.props.celsius ? Math.round(this.state.tempH[2]) : Math.round((this.state.tempH[2]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
							</tr>
						</table>
					</div>
					<table class={ style.currentInfo }>
						<tr>
							<th scope = "col">Cloudiness</th>
							<th scope = "col">Wind speed</th>
							<th scope = "col">Humidity</th>
						</tr>
						<tr>
							<td><img style={{height:"80px",marginRight:"auto",marginLeft:"auto",display:"block"}}src={cloudiness} alt="Cloudiness" /></td>
							<td><img style={{height:"80px",marginRight:"auto",marginLeft:"auto",display:"block"}}src={windSpeed} alt="Wind speed" /></td>
							<td><img style={{height:"80px",marginRight:"auto",marginLeft:"auto",display:"block"}}src={humidity} alt="Humidity" /></td>
						</tr>
						<tr class={ style.spaceTable }>
							<td style={{textAlign:"center"}}>{ this.state.currentCloudiness }% </td>
							<td style={{textAlign:"center"}}>{ this.state.windS } m/s </td>
							<td style={{textAlign:"center"}}>{ this.state.currentHumidity }% </td>
						</tr>
					</table>
					<div class={ style.tableScroll }>
						<Scrollbars style={{ width : 350, height: 250, bottom: 10}}>
						<table class={ style.weekInfo }>
								<tr>
									<th scope = "col"></th>
									<th scope = "col">Mon</th>
									<th scope = "col">Tue</th>
									<th scope = "col">Wed</th>
									<th scope = "col">Thu</th>
									<th scope = "col">Fri</th>
									<th scope = "col">Sat</th>
									<th scope = "col">Sun</th>
								</tr>
								<tr>
									<td></td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[0]) : Math.round((this.state.temper[0]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[1]) : Math.round((this.state.temper[1]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[2]) : Math.round((this.state.temper[2]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[3]) : Math.round((this.state.temper[3]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[4]) : Math.round((this.state.temper[4]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[5]) : Math.round((this.state.temper[5]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
									<td>{ this.props.celsius ? Math.round(this.state.temper[6]) : Math.round((this.state.temper[6]* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"} </td>
								</tr>
								<tr>
									<td></td>
									<td><img src={this.state.iconFutureArr[0]}/></td>
									<td><img src={this.state.iconFutureArr[1]} width="80"/></td>
									<td><img src={this.state.iconFutureArr[2]} width="80"/></td>
									<td><img src={this.state.iconFutureArr[3]} width="80"/></td>
									<td><img src={this.state.iconFutureArr[4]} width="80"/></td>
									<td><img src={this.state.iconFutureArr[5]} width="80"/></td>
									<td><img src={this.state.iconFutureArr[6]} width="80"/></td>
								</tr>
								<tr>
									<td style={{fontWeight: "bold"}}>Cloudiness</td>
									<td>{this.state.cloudiness[0]}%</td>
									<td>{this.state.cloudiness[1]}%</td>
									<td>{this.state.cloudiness[2]}%</td>
									<td>{this.state.cloudiness[3]}%</td>
									<td>{this.state.cloudiness[4]}%</td>
									<td>{this.state.cloudiness[5]}%</td>
									<td>{this.state.cloudiness[6]}%</td>
								</tr>
								<tr>
									<td style={{fontWeight: "bold"}}>Wind Speed</td>
									<td>{this.state.windSp[0]} m/s</td>
									<td>{this.state.windSp[1]} m/s</td>
									<td>{this.state.windSp[2]} m/s</td>
									<td>{this.state.windSp[3]} m/s</td>
									<td>{this.state.windSp[4]} m/s</td>
									<td>{this.state.windSp[5]} m/s</td>
									<td>{this.state.windSp[6]} m/s</td>
								</tr>
								<tr>
									<td style={{fontWeight: "bold"}}>Humidity</td>
									<td>{this.state.hum[0]}%</td>
									<td>{this.state.hum[1]}%</td>
									<td>{this.state.hum[2]}%</td>
									<td>{this.state.hum[3]}%</td>
									<td>{this.state.hum[4]}%</td>
									<td>{this.state.hum[5]}%</td>
									<td>{this.state.hum[6]}%</td>
								</tr>
						</table>
						</Scrollbars>
					</div>
				</div>
			</div>
		);
	}

	// function to set API values to variables
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
		});
	}

	// function to set API values to variables
	parseResponseFuture = (parsed_json) => {
		var i;
		var temperature=[];
		var cloudy=[];
		var windSpeed=[];
		var humid=[];
		var iconFuture=[];
		var iconFutureLink=[];

		for(i=0; i<7; i++){
			temperature.push(parsed_json['daily'][i]['temp']['day']);
			cloudy.push(parsed_json['daily'][i]['clouds']);
			windSpeed.push(parsed_json['daily'][i]['wind_speed']);
			humid.push(parsed_json['daily'][i]['humidity']);
			iconFuture.push(parsed_json['daily'][i]['weather']['0']['icon']);
			iconFutureLink.push("http://openweathermap.org/img/wn/"+iconFuture[i]+"@2x.png");
		}

		// set states for fields so they could be rendered later on
		this.setState({
			temper : temperature,
			cloudiness : cloudy,
			windSp : windSpeed,
			hum : humid,
			iconFutureArr : iconFutureLink
		});
	}

	// function to set API values to variables
	parseResponseCurrentInfo = (parsed_json) => {
		var temperatureH=[];
		var cloudy = parsed_json['current']['clouds']
		var windSpeed = parsed_json['current']['wind_speed'];
		var humidity = parsed_json['current']['humidity'];

		temperatureH.push(parsed_json['daily'][0]['temp']['morn'])
		temperatureH.push(parsed_json['daily'][1]['temp']['eve'])
		temperatureH.push(parsed_json['daily'][2]['temp']['night'])

		// set states for fields so they could be rendered later on
		this.setState({
			tempH: temperatureH,
			windS: windSpeed,
			currentHumidity: humidity,
			currentCloudiness: cloudy

		});
	}
}
