
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

// 1. Crear el servidor MCP
const server = new McpServer({
  name: "ai-dev-assistant-mcp",
  version: "1.0.0",
});

// 2. Registrar nuestra primera herramienta
server.registerTool(
  "saludar_desarrollador",
  {
    description: "Saluda a un desarrollador por su nombre",
    inputSchema: z.object({
      nombre: z.string().min(1).describe("Nombre del desarrollador"),
    }),
  },
  async ({ nombre }) => {
    return {
      content: [
        {
          type: "text",
          text: `¡Hola ${nombre}! Bienvenido a ai-dev-assistant.`,
        },
      ],
    };
  }
);

// 3. Iniciar el servidor mediante stdio
serveStdio(() => server);
