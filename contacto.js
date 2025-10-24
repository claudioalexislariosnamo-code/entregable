const SUPABASE_URL = 'https://rcwwqxxtsmulgjhbwqtb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjd3dxeHh0c211bGdqaGJ3cXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjU3NTIsImV4cCI6MjA3NjY0MTc1Mn0.tstaokJ6bi89NmEbaS3pT93Iun90UT_tloHdH2rH6M8';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

//----Detectar el envío del formulario----//
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  //----Obtener los valores de los campos----//
  const nombres = document.getElementById('nombres').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  //----Validar campos vacíos----//
  if (!nombres || !apellidos || !correo || !mensaje) {
    alert('⚠️ Por favor completa todos los campos.');
    return;
  }

  //----Insertar datos en la tabla 'contactos'----/
  const { error } = await supabase
    .from('contactarme')
    .insert([
      {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        comentario: mensaje
      }
    ]);

  //----Verificar errores o éxito----//
  if (error) {
    console.error('Error al guardar:', error);
    alert('❌ Error al guardar: ' + (error.message || JSON.stringify(error)));
  } else {
    alert('✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!');
    e.target.reset(); //---limpia el formulario---//
  }
});