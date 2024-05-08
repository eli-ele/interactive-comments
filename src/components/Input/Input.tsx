import { inputType } from "../types"

const Input = ({placeholder, value, onChange,type,className}:inputType) => {
  return (
      <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      className={className}
      />
  )
}

export default Input