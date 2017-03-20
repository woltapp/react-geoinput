import React, { PropTypes } from 'react';
import cx from 'classnames';
import DebounceInput from 'react-debounce-input';

import styles from './PredictiveInput.css';

const PredictiveInput = ({
  activePredictionId,
  className,
  containerClassName,
  containerStyle,
  predictions,
  predictionsClassName,
  predictionItemClassName,
  ...rest
}) => (
  <div className={cx(containerClassName, styles.root)} style={containerStyle}>
    <DebounceInput {...rest} debounceTimeout={300} className={cx(className, styles.input)} />

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
  activePredictionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  predictions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    onClick: PropTypes.func,
  })),
  predictionsClassName: PropTypes.string,
  predictionItemClassName: PropTypes.string,
};

export default PredictiveInput;
