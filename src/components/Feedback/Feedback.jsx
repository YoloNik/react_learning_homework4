import { useState } from 'react';
import FeedbackStats from './FeedbackStats/FeedbackStats';
import FeedbackControls from './FeedbackControls/FeedbackControls';

import styles from './Feedback.module.css';
import { useCallback } from 'react';

const Feedback = () => {
  const [feedbackGood, setFeedbackGood] = useState(0);
  const [feedbackNeutral, setFeedbackNeutral] = useState(0);
  const [feedbackBad, setFeedbackBad] = useState(0);

  const addFeedback = useCallback(e => {
    const statisticsBtnName = e.target.textContent.toLowerCase();

    switch (statisticsBtnName) {
      case 'good':
        setFeedbackGood(prevValue => prevValue + 1);
        break;
      case 'neutral':
        setFeedbackNeutral(prevValue => prevValue + 1);
        break;
      case 'bad':
        setFeedbackBad(prevValue => prevValue + 1);
        break;

      default:
        break;
    }
  }, []);

  const countTotalFeedback = () => {
    return feedbackGood + feedbackNeutral + feedbackBad;
  };

  const countPositiveFeedbackPercentage = () => {
    return (feedbackGood / countTotalFeedback()) * 100;
  };

  return (
    <div className={styles.feedBackPaper}>
      <h2>Please leave feedback</h2>
      <FeedbackControls addFeedback={addFeedback} />
      <h3>Statistics</h3>
      {countTotalFeedback() ? (
        <div className={styles.feedbackStatsWrapper}>
          <FeedbackStats
            good={feedbackGood}
            neutral={feedbackNeutral}
            bad={feedbackBad}
            countTotalFeedback={countTotalFeedback()}
            countPositiveFeedbackPercentage={countPositiveFeedbackPercentage()}
          />
        </div>
      ) : (
        <p>There is no feedback</p>
      )}
    </div>
  );
};

export default Feedback;
