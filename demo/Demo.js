import React, { Component } from 'react';

import { createGeoInput, DefaultGeoInput } from '../src/index';
import styles from './Demo.css';

const DemoInput = createGeoInput()(DefaultGeoInput);

class DemoView extends Component {
  state = {
    address: '',
    geoDestination: '',
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
