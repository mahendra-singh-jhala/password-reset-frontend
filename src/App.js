import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/Register"
import PasswordReset from './components/PasswordReset';
import PasswordResetForm from './components/ResetPasswordForm';

function App() {
	return (
		<div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
			<Router>
				<Routes>
					<Route path="/" element={<RegisterForm />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route path="/reset-password/:token" element={<PasswordResetForm />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;