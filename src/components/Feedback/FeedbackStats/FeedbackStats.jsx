import React from 'react';
import PropTypes from 'prop-types';

function FeedbackStats({
  good,
  neutral,
  bad,
  countTotalFeedback,
  countPositiveFeedbackPercentage,
}) {
  //console.log(countTotalFeedback);
  return (
    <div>
      <p>Good :{good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {countTotalFeedback}</p>
      <p>
        Positive feedback:{' '}
        {countPositiveFeedbackPercentage
          ? countPositiveFeedbackPercentage.toFixed(0)
          : 0}
        %
      </p>
    </div>
  );
}

export default FeedbackStats;

FeedbackStats.prototype = {
  good: PropTypes.string.isRequired,
  neutral: PropTypes.string.isRequired,
  bad: PropTypes.string.isRequired,
  countTotalFeedback: PropTypes.func.isRequired,
  countPositiveFeedbackPercentage: PropTypes.func.isRequired,
};
