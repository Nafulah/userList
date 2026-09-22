import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    gender: "Male",
  });
  const [popup, setPopup] = useState("");

  // Fetch users when the component loads
  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Fetch users again after adding/deleting
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add user");
      }

      setPopup(`User ${form.firstName} added!`);

      setForm({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        gender: "Male",
      });

      await fetchUsers();

      setTimeout(() => {
        setPopup("");
      }, 3000);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "sans-serif",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        MERN on Azure - Final
      </h1>

      {popup && (
        <div
          style={{
            background: "#4CAF50",
            color: "white",
            padding: 12,
            borderRadius: 8,
            textAlign: "center",
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          {popup}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({
              ...form,
              firstName: e.target.value,
            })
          }
          required
          style={{ padding: 12 }}
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              lastName: e.target.value,
            })
          }
          required
          style={{ padding: 12 }}
        />

        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
            })
          }
          required
          style={{ padding: 12 }}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
          style={{ padding: 12 }}
        />

        <select
          value={form.gender}
          onChange={(e) =>
            setForm({
              ...form,
              gender: e.target.value,
            })
          }
          style={{ padding: 12 }}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Not to say</option>
        </select>

        <button
          type="submit"
          style={{
            padding: 12,
            background: "#0078d4",
            color: "white",
            border: "none",
            borderRadius: 5,
            fontWeight: "bold",
          }}
        >
          Add User
        </button>
      </form>

      <h3 style={{ textAlign: "center", marginTop: 25 }}>
        Users from MongoDB: {users.length}
      </h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
        }}
      >
        <thead>
          <tr style={{ background: "#111", color: "white" }}>
            <th style={{ padding: 10 }}>First</th>
            <th>Last</th>
            <th>Age</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr
              key={u._id}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ddd",
              }}
            >
              <td style={{ padding: 8 }}>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.age}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>

              <td>
                <button
                  onClick={() => deleteUser(u._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;