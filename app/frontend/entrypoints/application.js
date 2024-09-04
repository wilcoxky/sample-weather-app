"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log("Vite ⚡️ Rails");
// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>
console.log("Visit the guide for more information: ", "https://vite-ruby.netlify.app/guide/rails");
// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
console.log("Hello from Kyle <3");
console.log("Were firing on all cylinders");
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')
// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'
const root = (0, client_1.createRoot)(document.getElementById("root"));
root.render(<h1>Hello World</h1>);
