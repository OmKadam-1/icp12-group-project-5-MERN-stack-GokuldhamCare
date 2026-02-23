function Input({ type, placeholder, name, value, onChange, onKeyDown, ref }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={ref}
      className="border border-green-300 rounded px-2 py-1 mx-1 my-1   block w-full  focus:border-green-500 focus:outline-none "
    />
  );
}

export default Input;