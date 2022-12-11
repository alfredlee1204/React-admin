import React from "react";
import { useRoutes, Link } from "react-router-dom"
import route from './router'
function App() {
  const outlet = useRoutes(route);
  return (
    <div className="App">
      {outlet}
    </div>
  )
}

export default App
