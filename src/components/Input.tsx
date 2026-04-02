import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

interface InputProps {
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  title?: string;
  name: string;
  value?: string | number | readonly string[];
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  children?: ReactNode;
}

const Input = ({
  name,
  onChange,
  value,
  placeholder,
  title,
  type,
  required,
  error,
  children,
}: InputProps) => {
  return (
    <div>
      <label className={`input  ${error ? "input-error" : "input-primary"}`}>
        {children}
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          title={title}
          name={name}
          onChange={onChange}
          value={value}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
