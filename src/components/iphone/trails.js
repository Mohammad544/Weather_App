// import preact
import { h, render, Component } from 'preact';
// import stylesheets for trails page
import style from './trails_style';
//import scrollbars from preact custom scrollbars
import { Scrollbars } from 'preact-custom-scrollbars';
// import jquery for API calls
import $, { ajaxSettings } from 'jquery';
//import trail photos
import SevenSisters from '../../assets/trails/Seven-Sisters.jpg';
import ThamesPath from '../../assets/trails/Thames-Path.jpg';
import EppingForest from '../../assets/trails/Epping-Forest.jpg';
import BoxHill from '../../assets/trails/Box-Hill.jpg';
import Oxford from '../../assets/trails/Oxford.jpg';
import Berwick from '../../assets/trails/Berwick-to-Exceat.jpg';

export default class Trails extends Component {

	// a constructor with initial set states and function calls to fetch API data
	constructor(props){
	super(props);
	this.fetchWeatherDataSevenSisters();
	this.fetchWeatherDataThamesPath();
	this.fetchWeatherDataEppingForest();
	this.fetchWeatherDataBoxHill();
	this.fetchWeatherDataOxford();
	this.fetchWeatherDataBerwick();

	}
	fetchWeatherDataSevenSisters = () => {
		// API URL with a structure of : http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=50.74795557122686&lon=0.1895902989942557&units=metric&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseSevenSisters,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	fetchWeatherDataThamesPath = () => {
		// API URL with a structure of :  http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=51.403184447717805&lon=-0.33733314656317515&units=metric&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseThamesPath,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	fetchWeatherDataEppingForest = () => {
		// API URL with a structure of :  http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=51.699782427739436&lon=0.10859841771796673&units=metric&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseEppingForest,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	fetchWeatherDataBoxHill = () => {
		// API URL with a structure of :  http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=51.254729605236385&lon=-0.30749530881623865&units=metric&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseBoxHill,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	fetchWeatherDataOxford = () => {
		// API URL with a structure of :  http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=51.669086433834494&lon=-1.2812105352489442&units=metric&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseOxford,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}
	fetchWeatherDataBerwick = () => {
		// API URL with a structure of :  http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&metric={metric}&appid={API key}
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=50.796663777922284&lon=0.03778091051290474&units=metric&appid=352109295ee39f8a5b08a0756d798ea4";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseBerwick,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	// the main render method for the Trails component
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

		// display all trails information. This is also where we use the "celsius" prop that is passed down from app.js in order to make the change between celsius and fahrenheit.
		return (
			<div class={ style.container } style={containerColor}>
			<h1 class={ style.header }>Recommended Trails</h1>
			<div class={ style.trails }>
				<Scrollbars style={{ width : 372, height : 600, bottom: 10}}>
					<div>
						<h4>Seaford to Eastbourne</h4>
						<p>This is one of the most spectacular day hikes near London, with views of (and plenty of hiking on) the distinctive chalk cliffs that form the Seven Sisters.</p>
						<figure>
							<img src={SevenSisters} style={{height:"100px",width:"152px"}} alt="SevenSisters trail" />
							<figcaption>Temperature: { this.props.celsius ? Math.round(this.state.tempSevenSisters) : Math.round((this.state.tempSevenSisters* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</figcaption>
						</figure>
					</div>
					<div>
						<h4>Hampton Court to Staines</h4>
						<p>Hampton Court may be one of London’s famous historic palaces, but it’s also the starting point for this gorgeous Thameside walk.</p>
						<figure>
							<img src={ThamesPath} style={{height:"100px",width:"150px"}} alt="Thames Path" />
							<figcaption>Temperature: { this.props.celsius ? Math.round(this.state.tempThamesPath) : Math.round((this.state.tempThamesPath* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</figcaption>
						</figure>
					</div>
					<div>
						<h4>Epping Forest</h4>
						<p>Starting from Theydon Bois, The Oak Trail leads you through parts of Epping Forest – complete with a deer sanctuary and a great pub.</p>
						<figure>
							<img src={EppingForest} style={{height:"100px",width:"150px"}} alt="Epping Forest" />
							<figcaption>Temperature: { this.props.celsius ? Math.round(this.state.tempEppingForest) : Math.round((this.state.tempThamesPath* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</figcaption>
						</figure>
					</div>
					<div>
						<h4>Box Hill</h4>
						<p>Ah, Box Hill. I have many fond memories of going on long hikes here as a child and I still think it offers some of the best walks near London today.</p>
						<figure>
							<img src={BoxHill} style={{height:"100px",width:"150px"}} alt="Box Hill" />
							<figcaption>Temperature: { this.props.celsius ? Math.round(this.state.tempBoxHill) : Math.round((this.state.tempBoxHill* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</figcaption>
						</figure>
					</div>
					<div>
						<h4>Abingdon to Oxford</h4>
						<p>This is another trail that follows the Thames Path and is absolutely beatiful and relaxing. Perfect hiking trail for any hiking fan.</p>
						<figure>
							<img src={Oxford} style={{height:"100px",width:"150px"}} alt="Oxford" />
							<figcaption>Temperature: { this.props.celsius ? Math.round(this.state.tempOxford) : Math.round((this.state.tempOxford* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</figcaption>
						</figure>
					</div>
					<div>
						<h4>Berwick to Exceat Bridge</h4>
						<p>Cute Berwick is a nice place to start the walk but it’s Alfriston, a small and rather twee ye olde village that you pass through later on the walk that is bound to steal your heart.</p>
						<figure>
							<img src={Berwick} style={{height:"100px",width:"150px"}} alt="Berwick" />
							<figcaption>Temperature: { this.props.celsius ? Math.round(this.state.tempBerwick) : Math.round((this.state.tempBerwick* 9)/5 + 32)} °{this.props.celsius ? "C" : "F"}</figcaption>
						</figure>
					</div>
				</Scrollbars>
			</div>
			</div>
	);
	}
	// function to set API values to variables for first trail
	parseResponseSevenSisters = (parsed_json) => {
		var temperatureSevenSisters = parsed_json['main']['temp'];

		// set state for the temperature field so it can be rendered later on
		this.setState({
			tempSevenSisters : temperatureSevenSisters,
		});
	}
	// function to set API values to variables for second trail
	parseResponseThamesPath = (parsed_json) => {
		var temperatureThamesPath = parsed_json['main']['temp'];

		// set state for the temperature field so it can be rendered later on
		this.setState({
			tempThamesPath : temperatureThamesPath,
	});
	}
	// function to set API values to variables for third trail
	parseResponseEppingForest = (parsed_json) => {
		var temperatureEppingForest = parsed_json['main']['temp'];

		// set state for the temperature field so it can be rendered later on
		this.setState({
			tempEppingForest : temperatureEppingForest,
	});
	}
	// function to set API values to variables for fourth trail
	parseResponseBoxHill = (parsed_json) => {
		var temperatureBoxHill = parsed_json['main']['temp'];

		// set state for the temperature field so it can be rendered later on
		this.setState({
			tempBoxHill : temperatureBoxHill,
	});
	}
	// function to set API values to variables for fifth trail
	parseResponseOxford = (parsed_json) => {
		var temperatureOxford = parsed_json['main']['temp'];

		// set state for the temperature field so it can be rendered later on
		this.setState({
			tempOxford : temperatureOxford,
	});
	}
	// function to set API values to variables for sixth trail
	parseResponseBerwick = (parsed_json) => {
		var temperatureBerwick = parsed_json['main']['temp'];

		// set state for the temperature field so it can be rendered later on
		this.setState({
			tempBerwick : temperatureBerwick,
	});
	}
}
