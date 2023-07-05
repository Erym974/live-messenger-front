import React from 'react'

export default function FormSwitch({ setData, data, children }) {
  return (
    <div className="form-switch">
        <span>{children}</span>
        <label className="switch">
        <input type="checkbox" checked={data} onChange={() => setData(!data)} />
        <span className="slider round"></span>
        </label>
    </div>
  )
}
