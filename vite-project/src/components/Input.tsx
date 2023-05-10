function Input(props) {
  const { type, name, label, value, onChange } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
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
