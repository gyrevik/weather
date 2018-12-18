import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveTable from "./ResponsiveTable";
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResponsiveTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<ResponsiveTable />);
});

it('shallow render without crashing', () => {
  const wrapper = shallow(<ResponsiveTable />);
  const header = <caption>New York, US 5 Day Forecast</caption>;
  expect(wrapper.contains(header)).toEqual(true);
});