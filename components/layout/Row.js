import React from 'react'

export default function Row({ children, className, wrap, ...props }) {
  return (
    <div className={`row ${className} ${wrap? 'wrap' : ''}`} {...props} >
        {children}
    </div>
  )
}
