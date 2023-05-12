interface InputProps {
  type: any;
  name: any;
  label: any;
  value: any;
  onChange: any;
}

function Input(props: InputProps) {
  const { type, name, label, value, onChange } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        className="main-form-input"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
