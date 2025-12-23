import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 1. Cole suas configurações aqui
const firebaseConfig = {
    apiKey: "AIzaSyB_w4-z_onAEUf10ROfYCmvnm6Fkkp2sYo",
    authDomain: "eletrica-8c96e.firebaseapp.com",
    projectId: "eletrica-8c96e",
    storageBucket: "eletrica-8c96e.firebasestorage.app",
    messagingSenderId: "456815528430",
    appId: "1:456815528430:web:4cf873dc8071c9a2bbe6ff",
    measurementId: "G-R3MJV2H443"
};

// 2. Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Seleção de elementos
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');
const btnLogout = document.getElementById('btnLogout');
const userStatus = document.getElementById('userStatus');

// 3. Função para Logar
btnLogin.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Bem-vindo!");
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
});

// 4. Função para Cadastrar (Opcional, mas útil para testar)
btnSignup.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => alert("Usuário criado!"))
        .catch((error) => alert(error.message));
});

// 5. Observador: Verifica em tempo real se o usuário está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
        userStatus.innerText = "Logado como: " + user.email;
        btnLogout.style.display = "block";
        // Aqui você poderia usar: window.location.href = "principal.html";
    } else {
        userStatus.innerText = "Você não está logado.";
        btnLogout.style.display = "none";
    }
});

// 6. Logout
btnLogout.addEventListener('click', () => {
    signOut(auth);
});