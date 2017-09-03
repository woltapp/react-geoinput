import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DebounceInput from 'react-debounce-input';

import styles from './PredictiveInput.css';

const PredictiveInput = ({
  activePredictionId,
  className,
  debounceTimeout,
  containerClassName,
  containerStyle,
  predictions,
  predictionsClassName,
  predictionItemClassName,
  ...rest
}) => (
  <div className={cx(containerClassName, styles.root)} style={containerStyle}>
    <DebounceInput
      {...rest}
      debounceTimeout={debounceTimeout}
      className={cx(className, styles.input)}
    />

    {predictions && !!predictions.length && (
      <div className={cx(styles.predictions, predictionsClassName)}>
        {predictions.map(prediction => (
          <div
            className={cx(styles.prediction, predictionItemClassName, {
              [styles.activePrediction]: activePredictionId === prediction.id,
            })}
            key={prediction.id}
            onClick={prediction.onClick}
          >
            {prediction.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

PredictiveInput.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  debounceTimeout: PropTypes.number,
  activePredictionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  predictions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    onClick: PropTypes.func,
  })),
  predictionsClassName: PropTypes.string,
  predictionItemClassName: PropTypes.string,
};

PredictiveInput.defaultProps = {
  debounceTimeout: 300,
};

export default PredictiveInput;
