import { ButtonType } from "../types"

const Button = ({onClick, content, className}:ButtonType) => {
  return (
      <button
          onClick={onClick}
          className={className}
          
      >
          {content}
      </button>
  )
}

export default Button