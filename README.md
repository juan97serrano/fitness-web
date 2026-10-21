# FitPulse 💪

Web de fitness estática (HTML, CSS y JavaScript sin dependencias).

**Demo:** https://juan97serrano.github.io/fitness-web/

## Funcionalidades

- **Programas de entrenamiento** — Full Body, PPL, HIIT y Movilidad con plan semanal.
- **Biblioteca de ejercicios** — filtrable por grupo muscular, con consejos de técnica.
- **Calculadora de calorías** — fórmula Mifflin-St Jeor, TDEE, macros e IMC.
- **Temporizador de intervalos** — trabajo/descanso/rondas con avisos sonoros.

## Ejecutar en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Estructura

```
index.html
assets/
  style.css   # estilos
  data.js     # programas y ejercicios
  app.js      # lógica (UI, calculadora, timer)
```

Para añadir ejercicios o programas, edita `assets/data.js`.
