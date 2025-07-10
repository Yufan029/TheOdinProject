function change(propertyName, event) {
    document.body.style.setProperty(propertyName, event.target.value);
  }
  
  document.getElementById('lineHeight').addEventListener('input', (e) => change('--lineHeight', e));
  document.getElementById('letterSpacing').addEventListener('input', (e) => change('--letterSpacing', e));
  document.getElementById('wordSpacing').addEventListener('input', (e) =>  change('--wordSpacing', e));