import React from 'react'
import axios from 'axios'
import { getCardinal } from '../util/util'

class ResponsiveTable extends React.Component {
  constructor() {
    super()
    
    //api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
    this.state = {apiID: '814e19f3074443de6b0f91f176dc1026',
                  apiBase: 'http://api.openweathermap.org/data/2.5/forecast',
                  city: 'New York',
                  country: 'US',
                  type: 'like',
                  units: 'imperial',
                  windUnit: 'mph',
                  list: []
    }
  }

  componentDidMount() {
    const { apiID, apiBase, city, country, type, units } = this.state
    const url = `${apiBase}?q=${city},${country}&type=${type}&appid=${apiID}&units=${units}`
    console.log('componentDidMount');
    console.log('url: ', url)

    this.search(url);
  }

  search = (url) => 
    axios.get(url)
      .then(res => {
        this.setState({list: res.data.list})
      })
      .catch(function (error) {
        console.log(error)
      });

  inputChange = (event) => {
    console.log('entered: ', event.target.value)
    this.setState({location: event.target.value})
  }
  
  searchBtn = () => {
    const { location } = this.state
    console.log('search location: ', location)
    if (location.lenth === 0) return

    const arr = location.split(',')
    if (arr.length === 1)
      this.setState({country: ''})

    this.setState({city: arr[0]})
    if (arr.length > 1)
      this.setState({country: arr[1]})
  }

  slice(list, index) {
    if (list.length === 0) return

    const beginSlice  = [0,  8, 16, 24, 32]
    const endSlice    = [8, 16, 24, 32, 40]

    return list.slice(beginSlice[index], endSlice[index])
  } 

  min(arr) {
    if (typeof arr === 'undefined') return undefined

    return arr.reduce((min, p) => p && p.main.temp_min < min ? p.main.temp_min : min, arr[0].main.temp_min)
  }

  max(arr) {
    if (typeof arr === 'undefined') return undefined
    
    return arr.reduce((max, p) => p && p.main.temp_max > max ? p.main.temp_max : max, arr[0].main.temp_max)
  }

  highLow(list, index) {
    return this.min(this.slice(list, index)) + ' / ' + this.max(this.slice(list, index))
  }

  getDate(dt_txt) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'MONTH']
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const d = new Date(dt_txt)

    return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`
  }

  render () {
    const { list, city, country, windUnit } = this.state;
    const indexes = [4, 12, 20, 28, 36]
    const location = `${city}, ${country}`
    //console.log('list in render: ', list)
    console.log('render')

    return (
      <table>
        <caption>
          <input type='text' id='location' onChange={this.inputChange} defaultValue={`${city}, ${country}`} />&nbsp;
          <input type='submit' value='UPDATE' onClick={this.searchBtn} />
        </caption>
        <caption>{location} 5 Day Forecast</caption>
        <thead>
          <tr>
            <th scope="col">DAY</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">HIGH / LOW</th>
            <th scope="col">PRESSURE</th>
            <th scope="col">WIND</th>
            <th scope="col">HUMIDITY</th>
          </tr>
        </thead>
        <tbody>
          {list && indexes.map((val, index) => 
            <tr key={index}>
              <td data-label="DAY">{list[indexes[index]] && this.getDate(list[indexes[index]].dt_txt)}</td>
              <td data-label="DESCRIPTION">{list[indexes[index]] && list[indexes[index]].weather[0].description}</td>
              <td data-label="HIGH / LOW">{this.highLow(list, index)}</td>
              <td data-label="PRESSURE">{list[indexes[index]] && list[indexes[index]].main.pressure}</td>
              <td data-label="WIND">{list[indexes[index]] && getCardinal(list[indexes[index]].wind.deg) + ' ' + list[indexes[index]].wind.speed + ' ' + windUnit}</td>
              <td data-label="HUMIDITY">{list[indexes[index]] && list[indexes[index]].main.humidity}%</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default ResponsiveTable