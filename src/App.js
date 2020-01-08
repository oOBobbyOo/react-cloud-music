import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import store from './store/index'
import routes from './routes/index'
import { GlobalStyle } from './assets/style'
import { IconStyle } from './assets/iconfont/iconfont'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  )
}

export default App
