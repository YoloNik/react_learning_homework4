import { useState } from 'react';
import FeedbackStats from './FeedbackStats/FeedbackStats';
import RegBtn from 'components/common/RegBtn/RegBtn';
import s from './Feedback.module.css';

const Feedback = () => {
  const [feedbackGood, setFeedbackGood] = useState(0);
  const [feedbackNeutral, setFeedbackNeutral] = useState(0);
  const [feedbackBad, setFeedbackBad] = useState(0);

  const addFeedback = e => {
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
  };

  const countTotalFeedback = () => {
    return feedbackGood + feedbackNeutral + feedbackBad;
  };

  const countPositiveFeedbackPercentage = () => {
    return (feedbackGood / countTotalFeedback()) * 100;
  };

  return (
    <div className={s.feedBackPaper}>
      <h2>Please leave feedback</h2>
      <div className={s.buttonWrapper}>
        <RegBtn
          handleClick={addFeedback}
          title="Good"
          name="good"
          type="button"
          className={s.button}
        >
          Good
        </RegBtn>
        <RegBtn
          handleClick={addFeedback}
          title="Neutral"
          name="neutral"
          type="button"
          className={s.button}
        >
          Neutral
        </RegBtn>
        <RegBtn
          handleClick={addFeedback}
          title="Bad"
          name="bad"
          type="button"
          className={s.button}
        >
          Bad
        </RegBtn>
      </div>
      <h3>Statistics</h3>
      {countTotalFeedback() ? (
        <div className={s.feedbackStatsWrapper}>
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
