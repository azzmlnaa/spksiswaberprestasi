const token = localStorage.getItem("token");

async function loadUsers() {
    const res = await fetch("http://localhost:4000/api/users", {
        headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();

    let html = "";
    data.forEach(u => {
        html += `
        <tr class="border-b">
            <td class="p-2">${u.id}</td>
            <td class="p-2">${u.username}</td>
            <td class="p-2">${u.full_name}</td>
            <td class="p-2">${u.role}</td>
            <td class="p-2">
                <button class="bg-red-500 text-white px-3 py-1 rounded"
                    onclick="deleteUser(${u.id})">Hapus</button>
            </td>
        </tr>`;
    });

    document.getElementById("userTable").innerHTML = html;
}

async function deleteUser(id) {
    if (!confirm("Hapus user?")) return;

    await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
    });

    loadUsers();
}

loadUsers();
