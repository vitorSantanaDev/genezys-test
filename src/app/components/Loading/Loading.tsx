import React from 'react'

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-primary">
      <div className="loader">
        <div className="w-16 h-16 border-4 border-solid border-b-border-primary rounded-full animate-spin border-accent-brand"></div>
      </div>
      <style>{`
        .loader {
          display: inline-block;
        }
      `}</style>
    </div>
  )
}
