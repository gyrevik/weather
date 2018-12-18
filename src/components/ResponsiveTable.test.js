import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveTable from "./ResponsiveTable";
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResponsiveTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('shallow renders without crashing', () => {
  shallow(<ResponsiveTable />);
});

it('render header as expected', () => {
  const wrapper = shallow(<ResponsiveTable />);
  const thead =         <thead>
                          <tr>
                            <th scope="col">DAY</th>
                            <th scope="col">DESCRIPTION</th>
                            <th scope="col">HIGH / LOW</th>
                            <th scope="col">PRESSURE</th>
                            <th scope="col">WIND</th>
                            <th scope="col">HUMIDITY</th>
                          </tr>
                        </thead>;
  expect(wrapper.contains(thead)).toEqual(true);
});