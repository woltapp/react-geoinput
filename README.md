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

React-geoinput makes it a breeze to combine both __geolocation suggestion__
and __geocoding an address__. Generally other libraries do only either at once. A good use case for this library is to be able to turn an address into coordinates and verify that the interpreted address was correct in textual format. Moreover, this library allows complete customization of the UI, and only provides components to get you quickly started!

## Examples

### Quick start

```jsx
import React, { Component } from 'react';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';

const SimpleInput = createGeoInput(DefaultGeoInput);

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
        <SimpleInput
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

### Usage with Redux-form

```jsx
import React from 'react';
import { Fields } from 'redux-form';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';

const GeoInput = createGeoInput(DefaultGeoInput);

const GeoField = fields => (
  <GeoInput
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

### Overview

React-geoinput exposes one higher order component (`createGeoInput`) and three regular
stateless React components (`DefaultGeoInput`, `GeoAddressInput`, `PredictiveInput`).

`createGeoInput` contains the main logic to handle fetching location
suggestions from the Google Maps API and to geocode the typed
address to a location object, which includes e.g. coordinates and parsed
location fields. In fact, `createGeoInput` provides __two__ inputs simultaneously:
typed address and geocoded location. Generally you'll want to store the information
separately, since address is the arbitrary string typed by user and location
is the accurate exact geolocation.

`DefaultInput` exists to get you quickly started with the library. It contains
opinionated styles and structure, which is a good starting point. If it works
for you, you can customize it via the props, otherwise you can use
it simply as a starting point to create your own completely custom input component.
`DefaultInput` uses `GeoAddressInput` underneath to provide the bare-bones
input with predictions (=suggestions).

`GeoAddressInput` is provided as a convenience component, which simply maps
the predictions (suggestions) from `createGeoInput()` to `PredictiveInput`.

`PredictiveInput` is provided as a utility component to provide a simple
input field with predictions -- it is not coupled to geocoding or locations anyhow.
It should be applicable for most cases and supports styling via props.
`PredictiveInput` uses `DebounceInput` from `react-debounce-input` to reduce
the amount of requests made to the Google Maps API.

### `createGeoInput(input: Component, <options: Object>)`

`createGeoInput` takes two arguments, first of which is your custom input (or `DefaultGeoInput`),
and the second one is options object.

##### The following options can be set:

* __`serializePrediction`__ _(Function)_: A function that takes `prediction` object
from the Google Maps API as an argument and turns it into a string that is suggested.
The structure of the `prediction` object is not included in this documentation.

* __`serializeGeoDestination`__ _(Function)_: A function that takes `geoDestination` object
from the Google Maps API as an argument and turns it to another object. By default it maps
the `geoDestination` keys as following: `route->street`, `street_number->streetNumber`,
`subpremise->subpremise`, `locality->city`, `country->country`, `postal_code->postalCode`,
`{ geometry }->{ lat, lng},viewport`. The structure of the `geoDestination` object is not
included in this documentation.

_Note: you won't need to change these options unless you are completely missing
an important value from the Google Maps API._


### `DefaultInput`

TODO


### `GeoAddressInput`

TODO


### `PredictiveInput`

TODO


## License

MIT
