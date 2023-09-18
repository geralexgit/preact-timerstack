import { h } from 'preact'
import { Route, Router } from 'preact-router'
import { StoreContext } from 'storeon/preact'
import { store } from '../store/storeIndex'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/index'
import ProgressBar from './ProgressBar/ProgressBar'

const App = () => (
	<div id="app">
		<StoreContext.Provider value={store}>
			<main>
				{/* <Home /> */}

				<Router>
					<Route path="/" component={Home} />
				</Router>
				<ProgressBar />
			</main>
		</StoreContext.Provider>
	</div>
)

export default App
