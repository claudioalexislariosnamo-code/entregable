const SUPABASE_URL = 'https://rcwwqxxtsmulgjhbwqtb.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjd3dxeHh0c211bGdqaGJ3cXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjU3NTIsImV4cCI6MjA3NjY0MTc1Mn0.tstaokJ6bi89NmEbaS3pT93Iun90UT_tloHdH2rH6M8';

// Crear cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Referencia al formulario
const form = document.getElementById('registroForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Obtener todos los datos del formulario
  const nombres = document.getElementById('nombres').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;
  const genero = document.getElementById('genero').value;
  const nacimiento = document.getElementById('nacimiento').value;

  // 2. Validaciones
  if (password !== password2) {
    alert('❌ Las contraseñas no coinciden');
    return;
  }

  // 3. Registro de autenticación (Supabase Auth)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (authError) {
    console.error('Error de autenticación:', authError);
    alert(`⚠️ Error al registrar credenciales: ${authError.message}`);
    return;
  }

  // 4. Registro de datos adicionales en la tabla 'usuarios'
  const userId = authData.user.id;

  const { error: dbError } = await supabase
    .from('registro')
    .insert([
      {
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        password: password,
        genero: genero,
        nacimiento: nacimiento
      }
      
    ]);

  if (dbError) {
    console.error('Error al guardar datos de perfil:', dbError);
    alert('⚠️ Registro de perfil fallido. Por favor, contacte soporte.');
  } else {
    alert('✅ Registro exitoso');
    window.location.href = '/index.html';
  }
});