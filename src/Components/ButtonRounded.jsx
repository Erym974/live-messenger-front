import React from 'react'

export default function ButtonRounded({ children, size, onClick, attributes, additionalClasses }) {
  return (
    <button onClick={onClick} className={`rounded-button ${size} ${additionalClasses}`} {...attributes}>
        { children }
    </button>
  )
}
