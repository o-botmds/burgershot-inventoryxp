import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://SEU-PROJETO.supabase.co";   // Project URL
const supabaseKey = "SEU-CHAVE-ANON";                   // anon public key
const supabase = createClient(supabaseUrl, supabaseKey);

// Cadastro
export async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role: "employee", authorized: false } }
  });

  alert(error ? error.message : "Cadastro realizado!");
}

// Login
export async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Login inválido");
  } else {
    alert("Login realizado!");
  }
}

// Inventário
export async function addItem() {
  const item = document.getElementById("item").value;
  const quantity = document.getElementById("quantity").value;

  const user = await supabase.auth.getUser();
  await supabase.from("inventory").insert([{ item, quantity, created_by: user.data.user.id }]);
  loadInventory();
}

export async function loadInventory() {
  const { data } = await supabase.from("inventory").select("*");
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.item} - ${i.quantity}`;
    list.appendChild(li);
  });
}

// Admin
export async function loadUsers() {
  const { data } = await supabase.from("users").select("*");
  const div = document.getElementById("users");
  div.innerHTML = "";
  data.forEach(u => {
    div.innerHTML += `<p>${u.name} - ${u.email} - ${u.role} - Autorizado: ${u.authorized}</p>`;
  });
}

