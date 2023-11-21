import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import Router from './components/Router'
import { Provider } from 'react-redux'
import { store } from './features/store'
import { QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <Router/>
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>
)