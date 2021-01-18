function ErrorMessage({ message, type }) {
  return (
    <div
      style={{
        backgroundColor: `${type === 'success' ? 'green' : '#f73d3d'}`,
        padding: '10px',
        color: 'white',
        width: '100%',
        fontSize: '0.8rem',
        borderRadius: '5px',
      }}
    >
      {message}
    </div>
  );
}

export default ErrorMessage;
