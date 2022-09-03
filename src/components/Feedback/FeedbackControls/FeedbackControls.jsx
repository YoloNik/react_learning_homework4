import { memo } from 'react';
import PropTypes from 'prop-types';
import RegBtn from 'components/common/RegBtn/RegBtn';
import styles from './FeedbackControls.module.css';

function FeedbackControls({ addFeedback }) {
  return (
    <div>
      <div className={styles.buttonWrapper}>
        <RegBtn
          handleClick={addFeedback}
          title="Good"
          name="good"
          type="button"
          className={styles.button}
        >
          Good
        </RegBtn>
        <RegBtn
          handleClick={addFeedback}
          title="Neutral"
          name="neutral"
          type="button"
          className={styles.button}
        >
          Neutral
        </RegBtn>
        <RegBtn
          handleClick={addFeedback}
          title="Bad"
          name="bad"
          type="button"
          className={styles.button}
        >
          Bad
        </RegBtn>
      </div>
    </div>
  );
}

FeedbackControls.propTypes = {
  addFeedback: PropTypes.func.isRequired,
};

export default memo(FeedbackControls);
