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


  render () {
    const { list } = this.state;
    const indexes = [4, 12, 20, 28, 36]
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
          {list && indexes.map((row, key) => 
            <tr key={key}>
              <td data-label="DAY">test</td>
              <td data-label="DESCRIPTION">test</td>
              <td data-label="HIGH / LOW">{indexes[key]}</td>
              <td data-label="PRESSURE">{list[indexes[key]] && list[indexes[key]].main.pressure}</td>
              <td data-label="WIND">test</td>
              <td data-label="HUMIDITY">test</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default ResponsiveTable