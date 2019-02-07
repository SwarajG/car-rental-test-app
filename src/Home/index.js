import React, { Component } from 'react';
import { Select, DatePicker, Button, message } from 'antd';
import { getAvailableLocations } from '../utils';
import CarList from '../Cars';
import s from './styles';

const Option = Select.Option;

class Home extends Component {
  // TODO: can put it in context if needed in the other components for default filters
  state = {
    location: '',
    date: '',
    isFilterSelected: false
  };

  getOptions = options => options.map(option => (
    <Option value={option} key={option}>
      {option}
    </Option>
  ))

  validateData = () => {
    const { location, date } = this.state;
    if (!location) {
      message.error('Please select a location...');
      return false;
    } else if (!date) {
      message.error('Please select a date...');
      return false;
    }
    return true;
  }

  handleChange = (value) => {
    this.setState({ location: value });
  }
  
  onDateChange = (date) => {
    this.setState({ date });
  }

  onSubmitClick = () => {
    const isDataValid = this.validateData();
    if (isDataValid) {
      this.setState({ isFilterSelected: true });
    }
  }

  render() {
    const locationList = getAvailableLocations();
    const { isFilterSelected, location, date } = this.state;
    if (isFilterSelected) {
      return (
        <CarList
          location={location}
          date={date}
        />
      )
    }
    return (
      <div className={s.pageWrapper}>
        <div className={s.formWrapper}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a location"
            onChange={this.handleChange}
          >
            {this.getOptions(locationList)}
          </Select>
          <DatePicker
            className={s.datePicker}
            onChange={this.onDateChange}
          />
          <Button type="primary" onClick={this.onSubmitClick} className={s.submit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;