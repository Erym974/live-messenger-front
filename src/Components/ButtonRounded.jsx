import React from 'react'

export default function ButtonRounded({ children, size, onClick, attributes }) {
  return (
    <button onClick={onClick} className={`rounded-button ${size}`} {...attributes}>
        { children }
    </button>
  )
}
