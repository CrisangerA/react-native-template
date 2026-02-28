# Módulo de Productos

## Funcionalidades principales

- Listar productos con búsqueda por texto y debounce.
- Ver detalle de producto con datos básicos y fechas.
- Crear producto desde formulario.
- Editar producto desde formulario precargado.
- Eliminar producto con confirmación en bottom sheet.
- Mostrar estados de carga, error y vacío en la lista.

## Dominio

- Definición de modelo de producto para app y para API.
- Adaptación de respuesta de API a modelo de app.
- Validación de formulario con reglas por campo y mensajes.
- Filtrado de productos por id, nombre o descripción.

## Aplicación

- Consulta de productos con cacheo y manejo de errores.
- Mutaciones de crear, actualizar y eliminar con invalidación de cache.
- Hook de debounce reutilizable para búsqueda.

## Infraestructura

- Servicio de red con operaciones CRUD contra la API de productos.
- Manejo de errores de red centralizado.
- Simulación de latencia de red.
- Servicio mock con datos de prueba para productos.

## UI

- Vista de listado con buscador y botón de agregar.
- Vista de detalle con acciones de editar y eliminar.
- Vista de formulario para alta y edición.
- Componentes de lista: ítem, separador, estados vacío/error, skeleton de carga.
- Bottom sheet de confirmación para eliminación con manejo de estado de carga.
