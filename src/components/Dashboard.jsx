import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { of } from "await-of";
import { useHistory, Link } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    const [logoutResult, logoutResultError] = await of(logout());
    if (logoutResultError) return setError("Logging out failed");
    setError("");
    history.push("/login");
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {`Email: ${currentUser.email}`}
          <Link className="w-100 btn btn-primary my-3" to="/update-profile">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
