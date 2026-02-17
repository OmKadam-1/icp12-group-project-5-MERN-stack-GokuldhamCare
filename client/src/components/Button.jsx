function Button({ title, size = "small", variant = "primary", onClick }) {
  const SIZE_CLASSES = {
    small: "px-2 py-1 text-xs mx-2",
    medium: "px-4 py-2 text-sm mx-3",
    large: "px-6 py-2 text-lg mx-4",
  };

  const VARIANTS_CLASSES = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-orange-400 text-black hover:bg-orange-600",
  };

  return (
    <button
      onClick={onClick}
      className={` ${SIZE_CLASSES[size]} rounded ${VARIANTS_CLASSES[variant]} `}
    >
      {title}
    </button>
  );
}

export default Button;