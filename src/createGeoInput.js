/* eslint-disable react/forbid-prop-types, react/no-find-dom-node, react/sort-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import getDisplayName from 'react-display-name';

import { geocodeByAddress } from './utils';

if (!window.google) {
  throw new Error('Google API has to be included. `google` must be a global object.');
}

const STATUS_AUTOCOMPLETE_OK = window.google.maps.places.PlacesServiceStatus.OK;

const KEYMAP = {
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ENTER_KEY: 13,
  ESC_KEY: 27,
};

const getAddressFieldFromGeoDestination = (fieldName, geoDestination) => {
  const field = geoDestination.address_components
    .find(component => component.types.includes(fieldName));
  return field ? field.long_name : undefined;
};

const defaultOptions = {
  serializePrediction: prediction => `${prediction.description}`,
  serializeGeoDestination: geoDestination => ({
    street: getAddressFieldFromGeoDestination('route', geoDestination),
    streetNumber: getAddressFieldFromGeoDestination('street_number', geoDestination),
    subpremise: getAddressFieldFromGeoDestination('subpremise', geoDestination),
    city: getAddressFieldFromGeoDestination('locality', geoDestination) ||
      getAddressFieldFromGeoDestination('postal_town', geoDestination),
    country: getAddressFieldFromGeoDestination('country', geoDestination),
    postalCode: getAddressFieldFromGeoDestination('postal_code', geoDestination),
    // if location is empty it'll be "_.Q" object
    location: geoDestination.geometry && geoDestination.geometry.location
      ? { lat: geoDestination.geometry.location.lat(), lng: geoDestination.geometry.location.lng() }
      : undefined,
    viewport: geoDestination.geometry.viewport,
  }),
};

function createGeoInput(WrappedInput, opts) {
  const options = { ...defaultOptions, ...opts };

  return class GeoInput extends PureComponent {
    static displayName = `GeoInput(${getDisplayName(WrappedInput)})`;

    static propTypes = {
      addressInput: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
        value: PropTypes.any,
      }).isRequired,
      geoDestinationInput: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
      }).isRequired,
      onPredictionsLoadError: PropTypes.func,
      onPredictionSelect: PropTypes.func,
      mapsApiOptions: PropTypes.shape({
        bounds: PropTypes.object,
        componentRestrictions: PropTypes.object,
        location: PropTypes.object,
        offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        radius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        types: PropTypes.array,
      }),
    }

    state = {
      error: false,
      selectedPrediction: undefined,
      activeIndex: undefined,
      showPredictions: false,
      predictions: [],
      loadingGeoDestination: false,
    }

    componentDidMount() {
      this.autocompleteService = new window.google.maps.places.AutocompleteService();
      document.addEventListener('click', this.onDocumentClick, false);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.onDocumentClick, false);
    }

    onDocumentClick = (event) => {
      if (!findDOMNode(this).contains(event.target)) {
        this.setState({ predictions: [] });
      }
    }

    loadPredictions = (input) => {
      const {
        mapsApiOptions,
        onPredictionsLoadError,
      } = this.props;

      if (!input) {
        this.setState({ predictions: [] });
        return;
      }

      this.autocompleteService.getPlacePredictions({ ...mapsApiOptions, input },
        (predictions, status) => {
          if (status !== STATUS_AUTOCOMPLETE_OK) {
            if (onPredictionsLoadError) {
              onPredictionsLoadError(status);
            }

            this.setState({
              error: true,
              predictions: [],
              activeIndex: undefined,
              selectedPrediction: undefined,
            });
          } else {
            this.setState({
              error: false,
              predictions,
              activeIndex: undefined,
              selectedPrediction: undefined,
            });
          }
        });
    }

    loadGeoDestination = (address) => {
      const { addressInput, geoDestinationInput } = this.props;

      const addressValue = address || addressInput.value;

      if (addressValue) {
        this.setState({ loadingGeoDestination: true });

        geocodeByAddress(addressValue).then((results) => {
          const result = results && results.length
            ? options.serializeGeoDestination(results[0])
            : {};

          this.setState(
            { loadingGeoDestination: false },
            () => geoDestinationInput.onChange(result),
          );
        }, () => {
          this.setState(
            { loadingGeoDestination: false },
            () => geoDestinationInput.onChange({}),
          );
        });
      }
    }

    onPredictionSelect = (prediction) => {
      const {
        addressInput,
        onPredictionSelect,
      } = this.props;

      addressInput.onChange(options.serializePrediction(prediction));

      if (onPredictionSelect) {
        onPredictionSelect(prediction);
      }

      this.setState({ selectedPrediction: prediction });
    }

    submitAddress = () => {
      this.setState({ activeIndex: undefined, predictions: [] });

      this.loadGeoDestination();
    }

    handleInputChange = (event) => {
      this.props.addressInput.onChange(event.target.value);
      this.loadPredictions(event.target.value);
    }

    handleKeyEnter = (event) => {
      event.preventDefault();

      const { activeIndex, predictions, selectedPrediction } = this.state;

      this.setState({ activeIndex: undefined, predictions: [] });

      if (activeIndex !== undefined && activeIndex >= 0) {
        this.onPredictionSelect(predictions[activeIndex]);
      } else if (selectedPrediction) {
        this.onPredictionSelect(selectedPrediction);
      }

      this.loadGeoDestination();
    }

    handleKeyEsc = (event) => {
      event.stopPropagation();

      this.setState({ predictions: [] });
    }

    handleKeyDown = () => {
      const { addressInput } = this.props;
      const { activeIndex, predictions } = this.state;

      if (!predictions || !predictions.length) {
        return;
      }

      if (activeIndex === undefined || activeIndex < predictions.length - 1) {
        const newActiveIndex = activeIndex === undefined ? 0 : activeIndex + 1;
        addressInput.onChange(options.serializePrediction(predictions[newActiveIndex]));
        this.setState({ activeIndex: newActiveIndex });
        this.onPredictionSelect(predictions[newActiveIndex]);
      }
    }

    handleKeyUp = () => {
      const { activeIndex, predictions } = this.state;

      if (!predictions || !predictions.length) {
        return;
      }

      if (activeIndex > 0) {
        const newActiveIndex = activeIndex - 1;
        this.setState({ activeIndex: newActiveIndex });
        this.onPredictionSelect(predictions[newActiveIndex]);
      }
    }

    handleInputKeyDown = (event) => {
      switch (event.keyCode) {
        case KEYMAP.ENTER_KEY:
          this.handleKeyEnter(event);
          break;
        case KEYMAP.ARROW_DOWN:
          this.handleKeyDown(event);
          break;
        case KEYMAP.ARROW_UP:
          this.handleKeyUp(event);
          break;
        case KEYMAP.ESC_KEY:
          this.handleKeyEsc(event);
          break;
        default:
          break;
      }
    }

    onPredictionClick = (index) => {
      const { predictions } = this.state;

      if (isNaN(index) || index > predictions.length - 1 || index < 0) {
        throw new Error('A valid prediction index must be given as 1st argument for `onPredictionClick`');
      }

      const selectedPrediction = predictions[index];

      this.setState({ activeIndex: undefined, predictions: [] });
      this.onPredictionSelect(selectedPrediction);
      this.loadGeoDestination(options.serializePrediction(selectedPrediction));
    }

    render() {
      return (
        <WrappedInput
          {...this.props}
          activeIndex={this.state.activeIndex}
          loadingGeoDestination={this.state.loadingGeoDestination}
          predictions={this.state.predictions}
          onPredictionClick={this.onPredictionClick}
          addressInput={{
            ...this.props.addressInput,
            onChange: this.handleInputChange,
            onKeyDown: this.handleInputKeyDown,
          }}
          geoDestinationInput={this.props.geoDestinationInput}
          submitAddress={this.submitAddress}
        />
      );
    }
  };
}

export default createGeoInput;
