document.getElementById("loginBtn").addEventListener("click", login);

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!username || !password) {
    errorMsg.textContent = "Username dan password wajib diisi";
    errorMsg.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.message || "Username / password salah";
      errorMsg.classList.remove("hidden");
      return;
    }

    // Simpan token dan identitas
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);

    // Redirect berdasarkan role
    if (data.role === "admin") {
      window.location.href = "dashboard.html";
    } else if (data.role === "wali_kelas") {
      window.location.href = "wali_dashboard.html";
    } else {
      errorMsg.textContent = "Role tidak dikenali";
      errorMsg.classList.remove("hidden");
    }

  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Terjadi kesalahan server";
    errorMsg.classList.remove("hidden");
  }
}
