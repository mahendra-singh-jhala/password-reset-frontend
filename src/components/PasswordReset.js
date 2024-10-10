import { useState } from "react";


const PasswordReset = () => {
    const [email, setEmail] = useState(''); // State for email input
    const [error, setError] = useState(''); // State for error messages
    const [message, setMessage] = useState(''); // State for success/error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            const res = await fetch("https://password-reset-imrv.onrender.com/api/users/password-reset", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email})
            })
            if (res.ok) {
                const data = await res.json();
                setMessage(data.message || "Password reset link sent successfully.")
                setEmail("");
            } else {
                const errordata = await res.json();
                setError(errordata.message || "Failed to submit email. Please try again")
            }
        } catch (error) {
            setError("Email failed Try Again")
        }
    }

    return (
        <div className="bg-primary-subtle p-4 rounded" style={{ width: "600px"}}>
            <form onSubmit={handleSubmit} >
                <h2 className="mb-5 text-success text-center">Password Reset Link</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label fw-bold" >Email</label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="mb-3 btn btn-success">Send Reset Link</button>
            </form>
        </div>
    )

}

export default PasswordReset