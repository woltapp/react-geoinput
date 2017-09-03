import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PredictiveInput from './PredictiveInput';
import styles from './GeoAddressInput.css';

const GeoAddressInput = ({
  className,
  containerClassName,
  predictions,
  activeIndex,
  onChange,
  onPredictionClick,
  style,
  ...rest
}) => (
  <PredictiveInput
    {...rest}
    onChange={onChange}
    containerClassName={cx(containerClassName, styles.container)}
    className={cx(className, styles.predictiveInput)}
    activePredictionId={activeIndex}
    predictions={predictions ? predictions.map((prediction, index) => ({
      id: index,
      label: `${prediction.structured_formatting.main_text},
        ${prediction.structured_formatting.secondary_text}`,
      onClick: () => onPredictionClick(index),
    })) : undefined}
  />
);

GeoAddressInput.propTypes = {
  activeIndex: PropTypes.number,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  onPredictionClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  predictions: PropTypes.array.isRequired,
  style: PropTypes.object,
};

export default GeoAddressInput;
