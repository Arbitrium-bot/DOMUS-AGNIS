import React, { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Registrando...');

    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgvTNvRD0fpvmpuK5KB_o4ouzJNYVX1saYFlFHhKacIOff7z92_0sQieY52RXumx5RklRW_sd-4S4mAlp8PduqI0i1s0WcUk4yKXVcSN8PqMg_4iM9x1TeAjYEqrJ_4hp0wTaErt0HY1TBfaC7UR2MiwoKSJNmovtYfivgSliizHDKrYGsWZvqsv1-E8X9oMBcuDeb7MyJPyogjfE7wHSoy_e89gEj5bidQbu6gAPwYmfNrojcYoVC-OjBPpt18r0oH_WA3SURjv_wuA8ynUXKCl-5htg&lib=MS9MpiIN2Xp5TLHmVwrDz5GqESH0jih7g', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'user_id=' + encodeURIComponent(username) + '&evento=Entrada no GPT'
      });
      const text = await response.text();
      setStatus('✅ Registro completo. Você pode retornar ao Guardião.');
    } catch (error) {
      setStatus('❌ Erro ao registrar. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container">
      <h1>✦ Bem-vindo à Domus Agni ✦</h1>
      <p className="subtitle">A Jornada Começa Agora.</p>
      <div className="register">
        <h2>📥 Registro Oficial</h2>
        <p>Antes de começar, insira seu nome de usuário para selar sua entrada na Domus Agni:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@seunome" required />
          <button type="submit">Selar Entrada</button>
        </form>
        <p className="register-message">{status}</p>
      </div>
    </div>
  );
}