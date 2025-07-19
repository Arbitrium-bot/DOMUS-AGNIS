// App.jsx import { useState } from 'react'; import './App.css';

function App() { const [username, setUsername] = useState(''); const [status, setStatus] = useState('');

const handleSubmit = async (e) => { e.preventDefault(); setStatus('Registrando...');

const formData = new URLSearchParams();
formData.append('user_id', username);
formData.append('evento', 'Entrada no GPT');

try {
  const response = await fetch(
    'https://script.google.com/macros/s/AKfycbzwNLXdt_SP745LSrZblmb7kXcv8cCZYiJVLzJsXxNJHbcYvzuYvWh-6V_t7RlWsYUC/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    }
  );

  const result = await response.text();
  if (result.includes('Erro: Nome já registrado')) {
    setStatus('❌ Nome já registrado. Escolha outro.');
  } else if (result.includes('OK')) {
    setStatus('✅ Registro completo. Você pode retornar ao Guardião.');
  } else {
    setStatus('⚠ Algo aconteceu: ' + result);
  }
} catch (error) {
  setStatus('❌ Erro ao registrar. Tente novamente mais tarde.');
}

};

return ( <div className="App"> <h1>Domus Agni – Registro Oficial</h1> <form onSubmit={handleSubmit}> <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@seunome" required /> <button type="submit">Selar Entrada</button> </form> <p>{status}</p> </div> ); }

export default App;
