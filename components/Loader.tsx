import React from 'react'

const Loader: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <span className="relative z-10 flex h-full w-full items-center justify-center transition">
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <div className="h-full min-h-[40px] w-full min-w-[40px] animate-spin rounded-full border-t-2 border-white bg-transparent" />
        {message && <p>{message.trim() || 'Loading Please Wait'}</p>}
      </div>
    </span>
  )
}

export default Loader
