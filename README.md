# react-geoinput

[![npm version](https://badge.fury.io/js/react-geoinput.svg)](https://badge.fury.io/js/react-geoinput)
[![Download Count](http://img.shields.io/npm/dm/react-geoinput.svg?style=flat-square)](https://npmjs.org/package/react-geoinput)

> Description here.

<img src="demo.gif" alt="react-geoinput example" />

## Features

* Suggestion of locations with Google Maps API
* Address geocoding with Google Maps API
* Customizable debounced input
* Customizable suggestion serialization and rendering
* Customizable geo destination serialization and rendering
* Standard `input` interface (compatible with `redux-form`)

## Install

```
npm install --save react-geoinput
```

## Try demo locally

```
git clone git clone https://github.com/woltapp/react-geoinput.git
cd react-geoinput
npm install
npm start
```

## What problem does the library solve?

React-geoinput makes it a breeze to combine geolocation suggestion
and geocoding an address

## Examples

#### Simple

```jsx
import React, { Component } from 'react';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';

class Example extends Component {
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
```

#### Usage with Redux-form

```jsx
import React, { Component } from 'react';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';

const GeoInput = reactGeoInput()(DefaultGeoInput);

const GeoField = fields => (
  <GeocodeInput
    addressInput={fields.address.input}
    geoDestinationInput={fields.destination.input}
  />
);
```

Use with `redux-form`'s `Fields` component:

```jsx
<Fields names={['address', 'destination']} component={GeoField} />
```

## API Documentation

TODO

## License

MIT
