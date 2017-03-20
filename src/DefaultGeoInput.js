import React, { PropTypes } from 'react';
import cx from 'classnames';

import PredictiveInput from './PredictiveInput';
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
  loadingGeoDestination,
  predictions,
  activeIndex,
  onPredictionClick,
  style,
}) => (
  <div className={cx(className, styles.root)} style={style}>
    <PredictiveInput
      {...addressInput}
      className={cx(addressInput.className, styles.addressInput)}
      activePredictionId={activeIndex}
      predictions={predictions ? predictions.map((prediction, index) => ({
        id: index,
        label: `${prediction.structured_formatting.main_text},
          ${prediction.structured_formatting.secondary_text}`,
        onClick: () => onPredictionClick(index),
      })) : undefined}
    />

    {!!loadingGeoDestination && (
      <div className={styles.loadingGeoDestination}>
        Loading geolocation...
      </div>
    )}

    {!loadingGeoDestination && geoDestinationInput.value && (
      <div className={styles.geoDestionation}>
        <table className={styles.geoDestinationTable}>
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
  loadingGeoDestination: PropTypes.bool,
  onPredictionClick: PropTypes.func.isRequired,
  predictions: PropTypes.array.isRequired,
  style: PropTypes.object,
};

DefaultGeoInput.defaultProps = {};

export default DefaultGeoInput;
