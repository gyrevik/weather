import React from 'react'
import axios from 'axios'

class ResponsiveTable extends React.Component {
  constructor() {
    super()
    
    //api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
    this.state = {apiID: '814e19f3074443de6b0f91f176dc1026',
                  apiBase: 'http://api.openweathermap.org/data/2.5/forecast',
                  city: 'München',
                  country: 'DE',
                  type: 'like',
                  list: []
    }
  }

  componentDidMount() {
    const { apiID, apiBase, city, country, type } = this.state;
    const url = `${apiBase}?q=${city},${country}&type=${type}&appid=${apiID}`;
    console.log('url: ', url)

    axios.get(url)
    .then(res => {
      console.log('res: ', res);
      console.log('res.data.list: ', res.data.list)
      this.setState({list: res.data.list})
      //const posts = res.data.data.children.map(obj => obj.data);
      //this.setState({ posts });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  slice(list, index) {
    console.log('list.length: ', list.length)
    if (list.length === 0) return

    const beginSlice  = [0,  8, 16, 24, 32]
    const endSlice    = [8, 16, 24, 32, 40]

    console.log('list in slice: ', list)
    console.log('logging slice for index', index)
    console.log('slice: ', list.slice(beginSlice[index], endSlice[index]))

    return list.slice(beginSlice[index], endSlice[index])
  } 

  min(arr) {
    console.log('typeof arr: ', typeof arr)
    if (typeof arr === 'undefined') return undefined

    console.log('arr.length: ', arr.length)
    return arr.reduce((min, p) => p && p.main.temp_min < min ? p.main.temp_min : min, arr[0].main.temp_min)
  }

  max(arr) {
    console.log('typeof arr: ', typeof arr)
    if (typeof arr === 'undefined') return undefined
    
    console.log('arr.length: ', arr.length)
    return arr.reduce((max, p) => p && p.main.temp_max > max ? p.main.temp_max : max, arr[0].main.temp_max)
  }

  highLow(list, index) {
    return `${this.min(this.slice(list, index))}/${this.max(this.slice(list, index))}`
  }

  render () {
    const { list } = this.state;
    const indexes = [4, 12, 20, 28, 36]
    const beginSlice = [0, 8, 16, 24, 32]
    const endSlice = [8, 16, 24, 32, 40]
    console.log('list in render: ', list)

    return (
      <table>
        <caption>Edgewater, NJ 5 Day Weather</caption>
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
              <td data-label="DAY">{list[indexes[index]] && list[indexes[index]].dt_txt}</td>
              <td data-label="DESCRIPTION">{list[indexes[index]] && list[indexes[index]].weather[0].description}</td>
              <td data-label="HIGH / LOW">{this.highLow(list, index)}</td>
              <td data-label="PRESSURE">{list[indexes[index]] && list[indexes[index]].main.pressure}</td>
              <td data-label="WIND">{list[indexes[index]] && list[indexes[index]].wind.deg + ' ' + list[indexes[index]].wind.speed}</td>
              <td data-label="HUMIDITY">{list[indexes[index]] && list[indexes[index]].main.humidity}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default ResponsiveTable