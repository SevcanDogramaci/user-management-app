import NavBar from './components/NavBar';
import UsersPage from './pages/Users/UsersPage';

function App() {
	return (
		<div>
			<NavBar />
			<div style={{ display: 'flex', margin: '2%' }}>
				<UsersPage />
			</div>
		</div>
	);
}

export default App;
