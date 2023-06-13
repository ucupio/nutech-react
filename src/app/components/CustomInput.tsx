export interface CustomInputProps {
  className?: string;
  type: string;
  placeholder: string;
  id: string;
  name?: string;
  onChange: (value: string) => void;
}

export default function CustomInput({
  className,
  type,
  placeholder,
  id,
  name,
  onChange,
}: CustomInputProps) {
  return (
    <div
      className={`relative z-0 w-full mb-6 rounded-md bg-blue-50 ${className}`}
    >
      <input
        type={type}
        name={name || id}
        id={id}
        className="block pt-6 pb-2 px-2 w-full text-[24px] text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-2 rounded-md peer"
        placeholder=" "
        required
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        htmlFor={id || name}
        className="text-left px-2 text-gray-400 duration-300 transform -z-10 origin-top-left text-sm peer-focus:text-sm peer-placeholder-shown:text-[24px] absolute top-2 left-0 right-0 peer-focus:top-2 peer-placeholder-shown:top-6 peer-placeholder-shown:left-0"
      >
        {placeholder}
      </label>
    </div>
  );
}
