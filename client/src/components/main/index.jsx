import React from 'react'

export default function Main({children, className}) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}
