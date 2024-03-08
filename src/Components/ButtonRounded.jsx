import React from 'react'

export default function ButtonRounded({ children, size, onClick, attributes, additionalClasses, tooltip }) {
  return (
    <button onClick={onClick} className={`rounded-button d-flex aic jcc ${size} ${additionalClasses ?? ""}`} {...attributes}>
        { children }
    </button>
  )
}
