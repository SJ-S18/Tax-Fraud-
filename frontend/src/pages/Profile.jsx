import { useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";
import AlertBox from "../components/AlertBox";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put("/auth/update", form, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Profile updated successfully!");
      setType("success");

      setForm({ ...form, password: "" });
    } catch (error) {
      setMessage("Error updating profile");
      setType("error");
    }
  };

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card form-page animate__animated animate__fadeIn">
          <PageActions />

          <h1 className="page-title">User Profile</h1>
          <p className="page-subtitle">
            Manage your account information and security.
          </p>

          <AlertBox message={message} type={type} />

          {/* Profile Info */}
          <div className="profile-info mb-4">
            <p><strong>Email:</strong> {storedUser?.email}</p>
            <p><strong>Role:</strong> {storedUser?.role}</p>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Leave blank if not changing"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="btn-glow" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

export default Profile;