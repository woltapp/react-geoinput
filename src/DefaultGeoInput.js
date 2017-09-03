import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import GeoAddressInput from './GeoAddressInput';
import styles from './DefaultGeoInput.css';

export const formatLatLng = (coordinates, precision = 4) =>
  `${coordinates.lat.toFixed(precision)}°N ${coordinates.lng.toFixed(precision)}° E`;

const rawVal = val => val;

const geoDestinationFields = [
  {
    label: 'Street',
    name: 'street',
    render: rawVal,
  },
  {
    label: 'Street Number',
    name: 'streetNumber',
    render: rawVal,
  },
  {
    label: 'Subpremise',
    name: 'subpremise',
    render: rawVal,
  },
  {
    label: 'City',
    name: 'city',
    render: rawVal,
  },
  {
    label: 'Country',
    name: 'country',
    render: rawVal,
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    render: rawVal,
  },
  {
    label: 'Coordinates',
    name: 'location',
    render: formatLatLng,
  },
];

const DefaultGeoInput = ({
  className,
  addressInput,
  geoDestinationInput,
  geoDestinationClassName,
  geoDestinationTableClassName,
  loadingGeoDestination,
  loadingElement,
  predictions,
  activeIndex,
  onPredictionClick,
  style,
}) => (
  <div className={cx(className, styles.root)} style={style}>
    <GeoAddressInput
      {...addressInput}
      className={cx(addressInput.className, styles.addressInput)}
      predictions={predictions}
      activeIndex={activeIndex}
      onPredictionClick={onPredictionClick}
    />

    {!!loadingGeoDestination && loadingElement}

    {!loadingGeoDestination && geoDestinationInput.value && (
      <div className={cx(styles.geoDestionation, geoDestinationClassName)}>
        <table className={cx(geoDestinationTableClassName, styles.geoDestinationTable)}>
          <tbody>
            {geoDestinationFields.map(field => (
              <tr key={field.label}>
                <td>
                  {field.label}
                </td>

                <td>
                  {geoDestinationInput.value[field.name]
                    ? field.render(geoDestinationInput.value[field.name])
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

DefaultGeoInput.propTypes = {
  activeIndex: PropTypes.number,
  addressInput: PropTypes.object.isRequired,
  className: PropTypes.string,
  geoDestinationInput: PropTypes.object.isRequired,
  geoDestinationClassName: PropTypes.string,
  geoDestinationTableClassName: PropTypes.string,
  loadingElement: PropTypes.node,
  loadingGeoDestination: PropTypes.bool,
  onPredictionClick: PropTypes.func.isRequired,
  predictions: PropTypes.array.isRequired,
  style: PropTypes.object,
};

DefaultGeoInput.defaultProps = {
  loadingElement: (
    <div className={styles.loadingGeoDestination}>
      Loading geolocation...
    </div>
  ),
};

export default DefaultGeoInput;
