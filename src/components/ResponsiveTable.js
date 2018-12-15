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
                  type: 'like'
    }
  }

  componentDidMount() {
    const { apiID, apiBase, city, country, type } = this.state;
    const url = `${apiBase}?q=${city},${country}&type=${type}&appid=${apiID}`;
    console.log('url: ', url)

    axios.get(url)
      .then(function (response) {
        console.log('response: ', response);
        console.log('response.data.list: ', response.data.list)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    const indexes = [4, 12, 20, 28, 36]
    return (
      <table>
        <caption>Edgewater, NJ 5 Day Weather</caption>
        <thead>
          <tr>
            <th scope="col">DAY</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">HIGH / LOW</th>
            <th scope="col">PRECIP</th>
            <th scope="col">WIND</th>
            <th scope="col">HUMIDITY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Account">Visa - 3412</td>
            <td data-label="Due Date">04/01/2016</td>
            <td data-label="Amount">$1,190</td>
            <td data-label="Period">03/01/2016 - 03/31/2016</td>
            <td data-label="Period">03/01/2016 - 03/31/2016</td>
            <td data-label="Period">03/01/2016 - 03/31/2016</td>
          </tr>
          <tr>
            <td scope="row" data-label="Account">Visa - 6076</td>
            <td data-label="Due Date">03/01/2016</td>
            <td data-label="Amount">$2,443</td>
            <td data-label="Period">02/01/2016 - 02/29/2016</td>
            <td data-label="Period">02/01/2016 - 02/29/2016</td>
            <td data-label="Period">02/01/2016 - 02/29/2016</td>
          </tr>
          <tr>
            <td scope="row" data-label="Account">Corporate AMEX</td>
            <td data-label="Due Date">03/01/2016</td>
            <td data-label="Amount">$1,181</td>
            <td data-label="Period">02/01/2016 - 02/29/2016</td>
            <td data-label="Period">02/01/2016 - 02/29/2016</td>
            <td data-label="Period">02/01/2016 - 02/29/2016</td>
          </tr>
          <tr>
            <td scope="row" data-label="Acount">Visa - 3412</td>
            <td data-label="Due Date">02/01/2016</td>
            <td data-label="Amount">$842</td>
            <td data-label="Period">01/01/2016 - 01/31/2016</td>
            <td data-label="Period">01/01/2016 - 01/31/2016</td>
            <td data-label="Period">01/01/2016 - 01/31/2016</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ResponsiveTable