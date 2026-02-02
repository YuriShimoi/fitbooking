import './FloatModal.css';

function FloatModal({ title, children }) {
  return (
    <div className="float-wrapper">
      <div className="float-modal">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default FloatModal;