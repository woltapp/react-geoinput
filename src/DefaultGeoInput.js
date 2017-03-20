import React, { PropTypes } from 'react';
import cx from 'classnames';

import PredictiveInput from './PredictiveInput';
import styles from './DefaultGeoInput.css';

const geoDestinationFields = [
  {
    label: 'Street',
    name: 'street',
  },
  {
    label: 'Street Number',
    name: 'streetNumber',
  },
  {
    label: 'Subpremise',
    name: 'subpremise',
  },
  {
    label: 'City',
    name: 'city',
  },
  {
    label: 'Country',
    name: 'country',
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
  },
  {
    label: 'Coordinates',
    name: 'Coordinates',
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
                  {geoDestinationInput.value[field.name] || '-'}
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
