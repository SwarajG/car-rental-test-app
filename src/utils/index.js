import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import carData from './car_data.json';
import shortid from 'shortid';

export const getAllCars = () => carData.map((car) => ({ ...car, id: shortid.generate() }));

export const getAvailableLocations = () => uniq(carData.map(car => car.Location));

// cars => List of all the cars for now
// filterObjects: {
//   Car_Type: [Hatchback, Sedan]
//   Fuel_Type: [Diesel]
// }
export const getFilteredCars = (cars, filterObjects, globalFilters, totalFiltersCount) => {
  const shouldAvailableOn = globalFilters.date.format('ddd');
  if (totalFiltersCount === 0) {
    const filteredCars = cars.filter(car => car.Location === globalFilters.location);
    return filteredCars.map(car => ({
      ...car,
      isAvailable: car.Availability.includes(shouldAvailableOn)
    }));

  }
  const filteredCars = cars.filter((car) => {
    let passingFilters = true;
    Object.entries(filterObjects).forEach(([key, value]) => {
      const carPropertyValue = car[key];
      if (value.length > 0) {
        passingFilters = value.includes(carPropertyValue) && car.Location === globalFilters.location;
      }
    });
    return passingFilters;
  });
  return filteredCars.map(car => ({
    ...car,
    isAvailable: car.Availability.includes(shouldAvailableOn)
  }));
};

export const filterCarsByPrice = (cars, type) => {
  if (type === 'asc') {
    return sortBy(cars, ['Price']);
  }
  return sortBy(cars, ['Price']).reverse();
};

export const getFilters = () => ({
  Transmission: uniq(carData.map(car => car.Transmission)),
  Fuel_Type: uniq(carData.map(car => car.Fuel_Type)),
  Car_Type: uniq(carData.map(car => car.Car_Type))
});