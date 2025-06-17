# 💻 Hackathon: Ahorrista Web App

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-hackathon-ahorrista-web-app)

## 🕑 Duración: 2 horas

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-duración-2-horas)

## 👥 Modalidad: Grupal (2-3 estudiantes por grupo)

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-modalidad-grupal-2-3-estudiantes-por-grupo)

## 🧪 Tema: Desarrollo frontend en React + TypeScript

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-tema-desarrollo-frontend-en-react--typescript)

---

## 🎯 Contexto

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-contexto)

Tu equipo debe construir la interfaz de **Ahorrista**, una app web que ayuda a jóvenes peruanos a visualizar y controlar sus gastos personales.

La aplicación debe conectarse a un backend ya implementado, consumir sus APIs de forma **eficiente y progresiva**, y permitir una navegación moderna, segura y escalable.

---

## 🚀 Objetivo

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-objetivo)

Construir una **SPA (Single Page Application)** usando **React + TypeScript** que permita:

- Registrarse e iniciar sesión (usando JWT)
- Visualizar el resumen mensual de gastos por categoría
- Consultar el detalle de gastos dentro de una categoría específica
- Registrar y eliminar nuevos gastos
- Visualizar y definir metas de ahorro mensuales

---

## ⚠️ Principio clave: Consumo eficiente de APIs

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#️-principio-clave-consumo-eficiente-de-apis)

El frontend debe:

✅ Mostrar **primero solo información agregada** (resumen mensual)  
✅ Solicitar la información detallada **solo cuando el usuario haga clic en una categoría**

Esto es crítico debido a la **gran cantidad de datos** que maneja el sistema (más de 10,000 gastos por usuario). Un mal consumo de la API puede afectar el rendimiento de la app.

---

## 🔐 Autenticación (JWT)

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-autenticación-jwt)

### 📝 Registro

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-registro)

POST http://198.211.105.95:8080/authentication/register

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "passwd": "contraseña_segura_123"
}
```

- La contraseña debe tener al menos **12 caracteres**.
- Al registrarse, el sistema creará automáticamente **10,000 gastos aleatorios** para el usuario.
- Si el correo ya existe, se devolverá un error 400.

---

### 🔓 Login

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-login)

POST http://198.211.105.95:8080/authentication/login

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "passwd": "contraseña_segura_123"
}
```

**Respuesta:**

```json
{
  "status": 200,
  "message": "success",
  "data": {
    "token": "JWT_TOKEN",
    "email": "usuario@ejemplo.com"
  }
}
```

---

### 🔐 Autorización

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-autorización)

Incluye el token JWT en todas tus llamadas protegidas:

```httpspec
Authorization: Bearer JWT_TOKEN
```

---

## 💰 Gastos

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-gastos)

### 📊 Resumen

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-resumen)

GET http://198.211.105.95:8080/expenses_summary

Devuelve el total de gastos por categoría del mes solicitado.  
Este endpoint es de **solo lectura**. No se permite POST, PUT ni DELETE.

---

### 🧾 Detalle de gastos por categoría

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-detalle-de-gastos-por-categoría)

GET http://198.211.105.95:8080/expenses/detail?year=YYYY&month=MM&categoryId=ID

Devuelve los gastos individuales del usuario autenticado para una categoría y mes específicos.

---

### ➕➖ Registrar y eliminar gastos

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-registrar-y-eliminar-gastos)

- `POST http://198.211.105.95:8080/expenses`
- `DELETE http://198.211.105.95:8080/expenses/:id`

---

## 🗂️ Categorías de gastos

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#️-categorías-de-gastos)

GET http://198.211.105.95:8080/expenses_category

Devuelve la lista de categorías disponibles.  
Este endpoint es de solo lectura y se usa para mostrar opciones de categoría al registrar un gasto o al filtrar.

---

## 🎯 Metas de ahorro

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-metas-de-ahorro)

Permiten definir metas por mes (por ejemplo, ahorrar 200 soles en julio).

- `GET http://198.211.105.95:8080/goals`
- `POST http://198.211.105.95:8080/goals`
- `PATCH http://198.211.105.95:8080/goals/:id`

---

## ✅ Evaluación

[](https://github.com/jbellidoutec/2025_1_dbp_hkt2#-evaluación)

Se evaluará:

|Criterio|Peso|
|---|---|
|Flujo completo de autenticación|20%|
|Consumo eficiente de la API|20%|
|Diseño de componentes (modularidad)|15%|
|Registro y visualización de gastos|15%|
|Metas y manejo del estado|15%|
|UI/UX limpio y usable|10%|
|Código limpio y tipado (TypeScript)|5%|

---

¡Buena suerte, y que gane el equipo más eficiente y elegante! 🚀