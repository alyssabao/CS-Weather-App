import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MoonLoader from "react-spinners/MoonLoader";
const cities = {
  hochiminh: {
    name: "Ho Chi Minh City",
    bg: "https://d3500i1ecak5li.cloudfront.net/s3fs-public/styles/banner/public/images/chapters/035512ea-3d2f-4754-9228-90b1f6c0f1e4-2060x1236.jpeg",
  },
  london: {
    name: "London",
    bg: "https://www.visitbritain.com/sites/default/files/consumer_components_enhanced/header_image/london_skyline_vb34141644.jpg",
  },
  beijing: {
    name: "Beijing",
    bg: "https://wallpapercave.com/wp/pjNWUrG.jpg",
  },
  paris: {
    name: "Paris",
    bg: "https://focusasiatravel.vn/wp-content/uploads/2018/09/Th%C3%A0nh-ph%E1%BB%91-Paris-2.jpg",
  },
  tokyo: {
    name: "Tokyo",
    bg: "https://www.telegraph.co.uk/content/dam/Travel/2019/August/iStock-1047662500.jpg"
  },
  moscow: {
    name: "Moscow",
    bg: "https://www.roughguides.com/wp-content/uploads/2018/06/moscow-cathedral-1680x1050.jpg"
  },
}

let apiKey = process.env.REACT_APP_APIKEY;


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null,
      img:"https://d3500i1ecak5li.cloudfront.net/s3fs-public/styles/banner/public/images/chapters/035512ea-3d2f-4754-9228-90b1f6c0f1e4-2060x1236.jpeg"
    }
  }
  getWeather = async (lon, lat) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    let data = await fetch(url)
    let result = await data.json()
    console.log("what's the result?", result)
    this.setState({ weatherResult: result })
  }
  changeCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cities[city].name}&appid=${apiKey}&units=metric`
    let data = await fetch(url)
    let result = await data.json()
    console.log("dddd", result)
    this.setState({ weatherResult: result ,img: cities[city].bg})
    console.log("I am in ", city)
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.longitude, post.coords.latitude)
    })
  }
  componentDidMount() {
    console.log("open your app already")
    this.getLocation()
  }
  render() {
    if (this.state.weatherResult == null) {
      return (<MoonLoader />)
    }
    return (
      <div className="format" style={{"backgroundImage":`url(${this.state.img})`}}>
          <div>
            <div className="title">
              <h1>Alyssa's Weather App</h1>
            </div>
            <div className="btnFormat">
              <button className="btn btn-dark btn-lg" onClick={() => this.changeCity("hochiminh")}>Ho Chi Minh</button>
              <button className="btn btn-dark btn-lg" onClick={() => this.changeCity("london")}>London</button>
              <button className="btn btn-dark btn-lg" onClick={() => this.changeCity("beijing")}>Beijing</button>
              <button className="btn btn-dark btn-lg" onClick={() => this.changeCity("paris")}>Paris</button>
              <button className="btn btn-dark btn-lg" onClick={() => this.changeCity("tokyo")}>Tokyo</button>
              <button className="btn btn-dark btn-lg" onClick={() => this.changeCity("moscow")}>Moscow</button>
            </div>
          </div>
          <div className="weatherFormat">
            <h2>{this.state.weatherResult.name}</h2>
            <h3>{this.state.weatherResult.main.temp}°C</h3>
            <h3>{this.state.weatherResult.weather[0].description}</h3>
          </div>
      </div>
    )
  }
}

