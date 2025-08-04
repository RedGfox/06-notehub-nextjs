'use client';

import css from './error.module.css';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className={css.container}>
      <p className={css.text}>
        Could not fetch the list of notes. {error.message}
      </p>
      <button className={css.reset} onClick={reset}>
        reset
      </button>
    </div>
  );
};

export default Error;
