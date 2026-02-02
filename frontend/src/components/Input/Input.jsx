import { useState, useEffect } from 'react';
import './Input.css';

function Input({ type, name, defaultValue, placeholder, icon, style, maxLength=9999, onChange=() => {} }) {
  const [fileLabel, setFileLabel] = useState(null);

  useEffect(() => {
    if (type === 'file' && defaultValue) {
      setFileLabel(defaultValue);
    }
  }, [defaultValue, type]);

  function updatePreview(el) {
    const file = el.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileLabel(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  
  switch(type) {
    case 'textarea':
      return (
        <div className="custom-input custom-input-textarea" style={style}>
          <textarea name={name} placeholder={placeholder} maxLength={maxLength} onChange={ev => onChange(ev.target.value)} defaultValue={defaultValue}></textarea>
        </div>
      );
    case 'image':
      return (
        <div className="custom-input custom-input-file" style={style}>
          <label 
            className={fileLabel ? "preview-image" : ""} 
            htmlFor="file-input" 
            style={fileLabel ? { backgroundImage: `url(${fileLabel})` } : {}}
          >
            {!fileLabel && <span>{placeholder}</span>}
          </label>
          <input id="file-input" name={name} type="file" accept="image/*" onChange={ev => {updatePreview(ev.target); onChange(ev.target.files[0])}} />
        </div>
      );
    case 'date':
      const dtnow = new Date();
      defaultValue = defaultValue?? `${dtnow.getFullYear()}-${String(dtnow.getMonth()+1).padStart(2, '0')}-${String(dtnow.getDate()+1).padStart(2, '0')}`;
      break;
  }

  return (
    <div className="custom-input" style={style}>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} maxLength={maxLength} onChange={ev => onChange(ev.target.value)} />
      {icon}
    </div>
  );
}

export default Input;