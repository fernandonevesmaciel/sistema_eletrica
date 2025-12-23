import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// SUAS CREDENCIAIS DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyB_w4-z_onAEUf10ROfYCmvnm6Fkkp2sYo",
  authDomain: "eletrica-8c96e.firebaseapp.com",
  projectId: "eletrica-8c96e",
  storageBucket: "eletrica-8c96e.firebasestorage.app",
  messagingSenderId: "456815528430",
  appId: "1:456815528430:web:4cf873dc8071c9a2bbe6ff",
  measurementId: "G-R3MJV2H443"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- LÓGICA DE PROTEÇÃO DE ROTA ---
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    
    if (user) {
        // Se estiver logado e na página de login, vai para a principal
        if (path.includes("index.html") || path === "/") {
            window.location.href = "principal.html";
        }
        // Se estiver na principal, mostra o email dele
        const display = document.getElementById('userEmail');
        if (display) display.innerText = "Usuário: " + user.email;
    } else {
        // Se NÃO estiver logado e tentar acessar a principal, volta pro login
        if (path.includes("principal.html")) {
            window.location.href = "index.html";
        }
    }
});

// --- BOTÕES DE LOGIN E CADASTRO (Só rodam se existirem na página) ---
const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
    btnLogin.onclick = () => {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, pass).catch(e => alert("Erro: " + e.message));
    };
}

const btnSignup = document.getElementById('btnSignup');
if (btnSignup) {
    btnSignup.onclick = () => {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        createUserWithEmailAndPassword(auth, email, pass).then(() => alert("Conta criada!")).catch(e => alert(e.message));
    };
}

const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.onclick = () => signOut(auth);
}

btnLogin.onclick = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if(!email || !pass) return alert("Preencha todos os campos");

    signInWithEmailAndPassword(auth, email, pass)
        .catch(e => {
            if(e.code === 'auth/user-not-found') alert("Usuário não encontrado");
            else if(e.code === 'auth/wrong-password') alert("Senha incorreta");
            else alert("Erro: " + e.message);
        });
};