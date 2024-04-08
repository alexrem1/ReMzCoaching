function ButtonLoad({
  isSubmittingText,
  isSubmitSuccessfulText,
  defaultText,
  isSubmitSuccessful,
  isSubmitting,
}) {
  return (
    <>
      <button className="primary-cta" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <p>{isSubmittingText}</p>
        ) : isSubmitSuccessful ? (
          <p>{isSubmitSuccessfulText}</p>
        ) : (
          <p>{defaultText}</p>
        )}
      </button>
    </>
  );
}

export default ButtonLoad;
