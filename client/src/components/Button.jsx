function Button({ title, size = "small", variant = "primary", onClick }) {
  const SIZE_CLASSES = {
    small: "px-2 py-1 text-xs mx-2",
    medium: "px-4 py-2 text-sm mx-3 mt-4",
    large: "px-6 py-2 text-lg mx-4 ",
  };

  const VARIANTS_CLASSES = {
    primary: "bg-green-500  text-white font-medium  hover:bg-green-600",
    secondary: "bg-green-500 text-white  font-medium hover:bg-green-600",
    tertiary: "bg-green-400 text-white hover:bg-green-600",
  };
  return (
    <button
      onClick={onClick}
      className={` ${SIZE_CLASSES[size]} rounded ${VARIANTS_CLASSES[variant]} cursor-pointer   `}
    >
      {title}
    </button>
  );
}

export default Button;