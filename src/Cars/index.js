import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import MediaQuery from 'react-responsive';
import uniq from 'lodash/uniq';
import { Button, message, Icon } from 'antd';
import { getFilteredCars, getAllCars, getFilters, filterCarsByPrice } from '../utils';
import { filterType } from '../utils/enums';
import { TransmissionFilter } from '../filters/TransmissionFilter';
import { CarTypeFilter } from '../filters/CarTypeFilter';
import { FuelFilter } from '../filters/FuelFilter';
import { Pricefilter } from '../filters/Pricefilter';
import s from './styles';

class Cars extends Component {
  state = {
    filters: {
      Transmission: [],
      Car_Type: [],
      Fuel_Type: []
    },
    totalFiltersCount: 0,
    priceFilter: 'asc', // 'asc' || 'dec'
    menuStatus: false
  };

  togglePriceFilter = () => this.setState((prevState) => {
    const newVal = prevState.priceFilter === 'asc' ? 'dec' : 'asc';
    return {
      priceFilter: newVal
    };
  });

  toggleMenu = () => this.setState(prevState => ({
    menuStatus: !prevState.menuStatus
  }))

  componentDidUpdate(prevProps, prevState) {
    const { menuStatus } = this.state;
    if (prevState.menuStatus !== menuStatus) {
      if (menuStatus) {
        const heightOfMenu = document.getElementById('menu').clientHeight;
        document.getElementById('carList').setAttribute('style', `margin-top: ${heightOfMenu + 50}px;`);
      } else {
        document.getElementById('carList').setAttribute('style', `margin-top: 50px;`);
      }
    }
  }

  updateFilters = (type) => (filtersList) => {
    const { filters } = this.state;
    const updatedFilters = cloneDeep(filters);
    let updateFiltersCount = 0;
    switch (type) {
      case filterType.CAR: {
        updatedFilters.Car_Type = uniq(filtersList);
        break;
      }
      case filterType.FUEL: {
        updatedFilters.Fuel_Type = uniq(filtersList);
        break;
      }
      case filterType.TRANSMISSION: {
        updatedFilters.Transmission = uniq(filtersList);
        break;
      }
      default:
        break;
    }
    Object.values(updatedFilters).forEach((value) => {
      updateFiltersCount += value.length;
    })
    this.setState({ filters: updatedFilters, totalFiltersCount: updateFiltersCount });
  }

  onCarBook = (car) => () => {
    message.success('Car is booked... Have Fun');
  }

  // Can be create it as more generic, but depends on the functionality
  renderFilters = (filters, selectedFilers, priceFilter) => (
    <React.Fragment>
      <Pricefilter
        type={priceFilter}
        togglePriceFilter={this.togglePriceFilter}
        className={s.filterWrapper}
      />
      <TransmissionFilter
        title="Transmission Type"
        filters={filters.Transmission}
        selected={selectedFilers.Transmission}
        updateFilter={this.updateFilters(filterType.TRANSMISSION)}
        className={s.filterWrapper}
      />
      <CarTypeFilter
        title="Car Type"
        filters={filters.Car_Type}
        selected={selectedFilers.Car_Type}
        updateFilter={this.updateFilters(filterType.CAR)}
        className={s.filterWrapper}
      />
      <FuelFilter
        title="Fuel Type"
        filters={filters.Fuel_Type}
        selected={selectedFilers.Fuel_Type}
        updateFilter={this.updateFilters(filterType.FUEL)}
        className={s.filterWrapper}
      />
    </React.Fragment>
  )

  renderCarDetailElement = (header, text) => (
    <div className={s.detailWrapper}>
      <p className={s.detailHeader}>{header}</p>
      <p className={s.detailText}>{text}</p>
    </div>
  )

  renderAllfilteredCars = cars => cars.map(car => (
    <div className={s.carCardWrapper} key={car.Name}>
      <div className={s.carImage(car.Photo)} />
      <div className={s.carDetail}>
        <h3 className={s.carName}>{car.Name}</h3>
        <div className={s.carDetailsList}>
          {this.renderCarDetailElement('Location', car.Location)}
          {this.renderCarDetailElement('Seats', car.Seats)}
          {this.renderCarDetailElement('Fuel', car.Fuel_Type)}
          {this.renderCarDetailElement('Transmission', car.Transmission)}
          {this.renderCarDetailElement('Car Type', car.Car_Type)}
        </div>
      </div>
      <div className={s.cardPrice}>
        <p className={s.priceText}>Rs. {car.Price}</p>
        {!car.isAvailable && <p>Not Available</p>}
        <Button
          className={s.booknowButton}
          disabled={!car.isAvailable}
          onClick={this.onCarBook(car)}
          type="primary"
        >
          Book Now
        </Button>
      </div>
    </div>
  ))

  render() {
    const { filters, totalFiltersCount, priceFilter, menuStatus } = this.state;
    const { location, date } = this.props;
    const globalFilters = { location, date };
    const allCars = getAllCars();
    const cars = getFilteredCars(allCars, filters, globalFilters, totalFiltersCount);
    const sortedCards = filterCarsByPrice(cars, priceFilter);
    const allFilters = getFilters();
    return (
      <div className={s.carsWrapper}>
        <MediaQuery query="(max-width: 580px)">
          <div className={s.iconWrapper} onClick={this.toggleMenu}>
            <Icon type="bars" style={{ cursor: 'pointer', marginLeft: '20px' }} />
          </div>
          {menuStatus && (
            <div className={s.menuWrapper} id="menu">
              <div className={s.displayFlex}>{this.renderFilters(allFilters, filters, priceFilter)}</div>
            </div>
          )}
        </MediaQuery>
        <div className={s.filtersList}>{this.renderFilters(allFilters, filters, priceFilter)}</div>
        <div className={s.carsList} id="carList">{this.renderAllfilteredCars(sortedCards)}</div>
      </div>
    );
  }
}

export default Cars;