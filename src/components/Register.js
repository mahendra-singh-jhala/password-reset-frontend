import { useState } from "react";

const RegisterForm = () => {
    const [username, setUsername] = useState(''); // State for username input
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [error, setError] = useState(''); // State for error messages
    const [message, setMessage] = useState(''); // State for success/error messages


    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, email, password };

        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            const res = await fetch("https://password-reset-imrv.onrender.com/api/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(user)
            })

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message || "Registration successfully.")
                setUsername("");
                setEmail("");
                setPassword("");
            } else {
                const errordata = await res.json();
                setError(errordata.message || "Registration Not successful, Try Again change username and email")

            }
        } catch (error) {
            setError("Registration failed")
        }
    }


    // Rendering the component
    return (
        <div className="bg-primary-subtle p-4 rounded" style={{ width: "600px" }}>
            <form onSubmit={handleSubmit}>
                <h2 className="mb-5 text-primary text-center">Register</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label fw-bold">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold" >Password</label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="mb-3 btn btn-success" >Register</button>
            </form>
        </div>
    )
}


export default RegisterForm