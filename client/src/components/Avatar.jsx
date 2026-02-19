function Avatar({ name, size = "medium" }) {
  const sizeClasses = {
    small: "h-6 w-6 text-xs",
    medium: "h-8 w-8 text-sm",
    large: "h-12 w-12 text-lg",
  };

  return (
    <span
      className={`bg-black text-white flex items-center justify-center rounded-full mr-2 ${sizeClasses[size]}`}
    >
      {name[0].toUpperCase()}
    </span>
  );
}

export default Avatar;
