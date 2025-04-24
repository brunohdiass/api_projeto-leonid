const form = document.getElementById('form-musica');

form.addEventListener('submit', async e => {
  e.preventDefault();   // **impede** o GET nativo
  // coleta dados...
  try {
    const res = await fetch('http://localhost:3000/v1/controle-musicas/musica', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(musica)
    });

    // se der 405, você pode logar pra ver o Allow:
    if (res.status === 405) {
      console.error('Método não permitido. Allow:', res.headers.get('Allow'));
      console.error('Resposta do servidor:', await res.text());
      alert('Método não permitido (405). Confira o console para detalhes.');
      return;
    }

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || res.statusText);
    }

    alert('Música cadastrada com sucesso!');
    form.reset();
    
  } catch (err) {
    console.error(err);
    alert('Erro: ' + err.message);
  }
});
