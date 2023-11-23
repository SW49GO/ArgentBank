import { QueryClient, QueryClientProvider} from 'react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './features/store'
import Router from './components/Router'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './styles/main.css'
import React from 'react'

// Creating a new QueryClient instance to handle client-side queries
// Allows management of queries, errors and data caching
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <Router/>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
)