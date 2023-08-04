import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Toaster } from 'react-hot-toast'

import Layout from './components/Layout.jsx'
import StateContext from './context/StateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Toaster />
		<StateContext>
			<Layout>
				<App />
			</Layout>
		</StateContext>
	</React.StrictMode>,
)
