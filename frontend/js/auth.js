document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.status !== 200) {
        document.getElementById("error").classList.remove("hidden");
        return;
    }

    // Simpan token
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);

    // Redirect admin ke dashboard
    window.location.href = "./dashboard.html";
});
