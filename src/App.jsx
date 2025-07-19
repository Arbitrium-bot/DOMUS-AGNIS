document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userId = document.getElementById('username').value.trim();
    const status = document.getElementById('statusMessage');

    if (!userId.startsWith("@")) {
        status.textContent = '❌ Nome deve começar com @.';
        return;
    }

    status.textContent = 'Verificando...';

    fetch("https://SEU_SCRIPT_URL", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: user_id=${encodeURIComponent(userId)}&evento=Entrada no GPT
    })
    .then(res => res.text())
    .then(response => {
        if (response === "DUPLICADO") {
            status.textContent = '❌ Esse nome já foi usado. Escolha outro.';
        } else {
            status.textContent = '✅ Registro completo. Bem-vindo à Domus Agni.';
        }
    })
    .catch(() => {
        status.textContent = '❌ Erro ao registrar. Tente novamente.';
    });
});
