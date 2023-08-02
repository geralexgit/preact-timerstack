import { h } from 'preact'
// import { Route, Router } from 'preact-router'
import { StoreContext } from 'storeon/preact'
import { store } from '../store/storeIndex'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/index'

const App = () => (
	<div id="app">
		<StoreContext.Provider value={store}>
			<main>
				<Home />
				{/* <Router>
					<Route path="/" component={Home} />
				</Router> */}
			</main>
		</StoreContext.Provider>
	</div>
)

export default App
