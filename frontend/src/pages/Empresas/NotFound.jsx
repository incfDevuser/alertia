import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Back Home</Link>
    </div>
  )
}

export default NotFound
