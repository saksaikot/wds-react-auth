import React, { useRef } from "react";
import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth, currentUser } from "../contexts/AuthContext";
import { of } from "await-of";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const [resetPasswordResult, resetPasswordResultError] = await of(
      resetPassword(emailRef.current.value)
    );
    setLoading(false);
    if (resetPasswordResultError)
      return setError(resetPasswordResultError.message);

    setError("");
    setMessage("Please check inbox for further instruction");
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 my-3" type="submit">
              Reset password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center my-3">
        Or <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}
