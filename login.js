    const SUPABASE_URL = 'https://rcwwqxxtsmulgjhbwqtb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjd3dxeHh0c211bGdqaGJ3cXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjU3NTIsImV4cCI6MjA3NjY0MTc1Mn0.tstaokJ6bi89NmEbaS3pT93Iun90UT_tloHdH2rH6M8';
    
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const form = document.getElementById('loginForm');
    const messageContainer = document.getElementById('message-container');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        mostrarMensaje('⚠️ Por favor completa todos los campos', 'error');
        return;
      }

      // Guardar datos en la tabla 'login'
      const { data, error } = await supabase
        .from('login')
        .insert([
          { email: email, password: password }
        ]);

      if (error) {
        console.error('Error al guardar:', error);
        mostrarMensaje('❌ Error al iniciar sesión', 'error');
      } else {
        mostrarMensaje('✅ Inicio de sesión correcto', 'success');
        setTimeout(() => {
          window.location.href = '/Inicio.html';
        }, 1000);
      }
    });

    function mostrarMensaje(texto, tipo) {
      messageContainer.textContent = texto;
      messageContainer.style.color = tipo === 'error' ? 'red' : 'green';
      messageContainer.style.marginTop = '10px';
      messageContainer.style.textAlign = 'center';
    }