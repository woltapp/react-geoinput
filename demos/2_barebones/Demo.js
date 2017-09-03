/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createGeoInput } from 'react-geoinput';

import styles from './Demo.css';

const BarebonesGeoInput = ({
  addressInput,
  loadingGeoDestination,
  geoDestinationInput,
  onPredictionClick,
  predictions,
}) => (
  <div>
    <input {...addressInput} />

    {loadingGeoDestination && <div style={{ marginTop: 10 }}>Loading geo destination ...</div>}

    <hr />

    <div>
      <h3>
        predictions:
      </h3>

      <div>
        {!!predictions && !!predictions.length ? predictions.map((prediction, index) => (
          <div
            key={index}
            style={{ border: '1px solid #ccc', marginTop: 10, padding: 5, fontSize: 12 }}
          >
            {JSON.stringify(prediction)}

            <div style={{ marginTop: 10 }}>
              <button
                style={{ padding: 10 }}
                onClick={() => onPredictionClick(index)}
              >
                Select
              </button>
            </div>
          </div>
        )) : '-'}
      </div>
    </div>

    <hr />

    <div>
      <h3>
        geoDestination value:
      </h3>

      <div>
        <pre>
          {geoDestinationInput.value
            ? JSON.stringify(geoDestinationInput.value, null, 2)
            : '-'}
        </pre>
      </div>
    </div>

  </div>
);

BarebonesGeoInput.propTypes = {
  addressInput: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  loadingGeoDestination: PropTypes.bool.isRequired,
  geoDestinationInput: PropTypes.shape({
    value: PropTypes.object,
  }).isRequired,
  onPredictionClick: PropTypes.func.isRequired,
  predictions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    onClick: PropTypes.func,
  })).isRequired,
};

const DemoInput = createGeoInput(BarebonesGeoInput);

class DemoView extends Component {
  state = {
    address: '',
    geoDestination: undefined,
  }

  onAddressChange = value => this.setState({ address: value })

  onGeoDestinationChange = value => this.setState({ geoDestination: value })

  render() {
    return (
      <div>
        <DemoInput
          addressInput={{
            className: styles.addressInput,
            onChange: this.onAddressChange,
            value: this.state.address,
          }}
          geoDestinationInput={{
            onChange: this.onGeoDestinationChange,
            value: this.state.geoDestination,
          }}
        />
      </div>
    );
  }
}

export default DemoView;
