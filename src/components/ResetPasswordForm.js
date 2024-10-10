import { useState } from "react";
import { useParams } from 'react-router-dom';


const PasswordRestForm = () => {
    const { token } = useParams();
    const [password, setPassword] = useState(''); // State for password input
    const [error, setError] = useState(''); // State for error messages
    const [message, setMessage] = useState(''); // State for success/error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            const res = await fetch(`https://password-reset-imrv.onrender.com/api/users/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({password})
            })
            if(res.ok) {
                const data = await res.json();
                setMessage(data.message || "Password Reset successfully.")
                setPassword("");
            } else {
                const errordata = await res.json();
                setError(errordata.message || "Password Not Reset successfully.")
            }
        } catch (error) {
            setError("Password Not Reset Try Again")
        }
    }

    return (
        <div className="bg-primary-subtle p-4 rounded " style={{ width: "600px"}}>
            <form onSubmit={handleSubmit}>
                <h2 className="mb-5 text-success text-center">Reset Password</h2>
                
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-4">
                    <label className="form-label fw-bold" >Password</label>
                    <input
                        type="password"
                        placeholder="Reset Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="mb-3 btn btn-success">Reset Password</button>
            </form>
        </div>
    )

}

export default PasswordRestForm