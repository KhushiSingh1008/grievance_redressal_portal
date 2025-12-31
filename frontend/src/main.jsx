import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ReactDOM.render(<React.StrictMode>
//   <App />
// </React.StrictMode>,document.getElementById("root"))

//The new createRoot method enables React's Concurrent Mode, 
// allowing features like Automatic Batching and Transitions, 
// which significantly improve performance and user experience."