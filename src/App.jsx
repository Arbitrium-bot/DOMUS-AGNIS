
import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [guardMessage, setGuardMessage] = useState('');
  const [guardResponse, setGuardResponse] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatusMessage('Registrando...');
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzwNLXdt_SP745LSrZblmb7kXcv8cCZYiJVLzJsXxNJHbcYvzuYvWh-6V_t7RlWsYUC/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `user_id=${encodeURIComponent(username)}&evento=Entrada no GPT`
      });
      const result = await response.text();
      if (result.includes('OK')) {
        setStatusMessage('✅ Registro completo. Você pode retornar ao Guardião.');
      } else {
        setStatusMessage('❌ Erro ao registrar. Tente novamente mais tarde.');
      }
    } catch (error) {
      setStatusMessage('❌ Erro ao registrar. Tente novamente mais tarde.');
    }
  };

  const handleMessageSend = async () => {
    if (!guardMessage || !username) return;
    setGuardResponse('Enviando mensagem ao Guardião...');
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzwNLXdt_SP745LSrZblmb7kXcv8cCZYiJVLzJsXxNJHbcYvzuYvWh-6V_t7RlWsYUC/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `user_id=${encodeURIComponent(username)}&evento=Mensagem: ${encodeURIComponent(guardMessage)}`
      });
      const result = await response.text();
      if (result.includes('OK')) {
        setGuardResponse('📨 Mensagem enviada ao Guardião. Aguarde a resposta.');
        setGuardMessage('');
      } else {
        setGuardResponse('Erro ao enviar a mensagem.');
      }
    } catch (error) {
      setGuardResponse('Erro ao enviar a mensagem.');
    }
  };

  return (
    <div className="container">
      <h1>✦ Bem-vindo à Domus Agni ✦</h1>
      <p className="subtitle">A Jornada Começa Agora.</p>

      <div className="register">
        <h2>📥 Registro Oficial</h2>
        <p>Antes de começar, insira seu nome de usuário para selar sua entrada na Domus Agni:</p>
        <form onSubmit={handleRegister}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@seunome" required />
          <button type="submit">Selar Entrada</button>
        </form>
        <p className="register-message">{statusMessage}</p>
      </div>

      <div className="message-guard">
        <h2>💬 Enviar mensagem ao Guardião</h2>
        <p>Digite sua mensagem abaixo. Ela será registrada e o Guardião poderá respondê-lo diretamente:</p>
        <textarea value={guardMessage} onChange={(e) => setGuardMessage(e.target.value)} placeholder="Escreva sua mensagem..." rows={4}></textarea>
        <button onClick={handleMessageSend}>Enviar ao Guardião</button>
        <p className="guard-response">{guardResponse}</p>
      </div>
    </div>
  );
}
