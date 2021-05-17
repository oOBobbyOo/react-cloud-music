import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from './store'
import routes from './routes'
import { GlobalStyle } from '@a/style/global'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  )
}

export default App
