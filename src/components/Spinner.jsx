export const Spinner = ({size}) => {
  return (
      <div className={`spinner-border ${size == 'small' && 'spinner-border-sm'}`} role="status"></div>
  );
};
