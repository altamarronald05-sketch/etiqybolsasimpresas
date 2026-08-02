# 🛍️ etiqybolsasimpresas - Catálogo & Packaging Personalizado

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![WhatsApp Integration](https://img.shields.io/badge/WhatsApp-Order_System-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/573506765219)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Plataforma e-commerce y catálogo interactivo de **etiqybolsasimpresas**, especializada en empaques personalizados (bolsas kraft, bolsas plásticas, cajas corrugadas) y etiquetas adhesivas en rollo/pliego para marcas y emprendedores con cotización directa a **WhatsApp**.

---

## 🌟 Características Principales

- **🧭 Navegación Multipágina (SPA Router)**: Vistas independientes de *Inicio*, *Catálogo Completo*, *Por Qué Elegirnos* y *Galería de Trabajos*.
- **📊 Catálogo Dinámico impulsado por JSON (`data/products.json`)**: Gestión sencilla de inventario, precios por volumen, ofertas y especificaciones técnicas.
- **🔍 Filtros & Búsqueda Avanzada**:
  - Buscador en tiempo real por nombre, material o descripción.
  - Filtros por categorías (*Bolsas Kraft, Bolsas Plásticas, Etiquetas en Rollo, Cajas & Cintas*).
  - Ordenamiento dinámico (Precio menor/mayor, Nombre A-Z).
  - Filtro exclusivo para productos en **Oferta**.
- **📑 Modal Ficha Técnica & Precios por Volumen**: Visualización de detalles del empaque, especificaciones de impresión y matriz de precios con descuento por cantidad (100+, 500+, 1000+ unidades).
- **📲 Cotizador Lateral de WhatsApp (Drawer)**:
  - Selección de formato/medida (P, M, G).
  - Contador de unidades requerido.
  - Generador de mensaje pre-llenado enviado directamente al WhatsApp comercial **+57 3506765219**.
- **🖨️ Generación de Catálogo PDF**: Impresión limpia integrada para guardar o enviar el catálogo en formato PDF.
- **💬 Floating WhatsApp Button**: Botón de atención al cliente constante en pantalla.

---

## 🏗️ Estructura del Proyecto

```text
etiqybolsasimpresas/
├── assets/                       # Imágenes de producto y mocups HD
│   ├── bolsas_kraft.png
│   ├── etiquetas_rollo.png
│   ├── bolsas_plasticas.png
│   └── cajas_impresas.png
├── data/
│   └── products.json             # Fuente de datos de productos e inventario
├── scripts/
│   ├── importXlsx.js             # Importador masivo de catálogo desde Excel
│   ├── clean_descriptions.cjs    # Sanitizador de textos y formato
│   └── generate-catalog-pdf.js   # Generador de catálogo imprimible en PDF
├── index.html                    # Estructura principal HTML5 + Tailwind UI
├── styles.css                    # Estilos modo oscuro, animación y reglas print
├── app.js                        # Lógica de navegación, filtros y cotizaciones
├── package.json                  # Dependencias y scripts de desarrollo
├── vite.config.js                # Configuración de compilación Vite
├── tailwind.config.js            # Configuración de tema personalizado Tailwind
├── postcss.config.js             # PostCSS plugins
├── .env.example                  # Variables de entorno de muestra
├── .gitignore                    # Archivos excluidos de Git
└── README.md                     # Documentación oficial del proyecto
```

---

## 💻 Instalación y Desarrollo Local

### Requisitos Previos
- [Node.js](https://nodejs.org/) v18+ y `npm`.

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/altamarronald05-sketch/etiqybolsasimpresas.git
   cd etiqybolsasimpresas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛠️ Scripts Disponibles en `package.json`

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor local de desarrollo con HMR. |
| `npm run build` | Compila el proyecto listo para producción. |
| `npm run preview` | Previsualiza el build de producción. |
| `npm run import-catalog` | Ejecuta el script de importación masiva desde Excel. |
| `npm run generate:catalog` | Compila el catálogo PDF de productos. |

---

## 📲 Configuración de WhatsApp

El número de contacto predeterminado está configurado en `app.js`:

```javascript
const WHATSAPP_PHONE = "573506765219";
```

Cualquier cotización generada desde la web se dirige a este número de WhatsApp con un mensaje estructurado.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

Desarrollado con ❤️ para **etiqybolsasimpresas** — *Packaging & Etiquetas Personalizadas*.
