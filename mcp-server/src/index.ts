
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

server.registerTool(
    "obtener_fecha_hora",
    {
        description: "Obtener la fecha y hora actuales de Bolivia",
        inputSchema: z.object({}),
    },
    async()=>{
        const fechaHora = new Intl.DateTimeFormat("es-BO",{
            dateStyle: "full",
            timeStyle: "long",
            timeZone: "America/La_Paz",
        }).format(new Date());

        return{
            content: [
                {
                    type: "text",
                    text: `La fecha y hora actuales son: ${fechaHora}`
                }
            ]
        }
    }
);
server.registerTool(
    "analizar_texto",
    {
        description: "Obtener texto y analizarlo",
        inputSchema: z.object({
            texto: z.string().min(1)
        })
    },
    async ({texto}) => {
        const caracteres = texto.length;
        const textoLimpio = texto.trim();
        const palabras = textoLimpio === "" ? 0 : textoLimpio.split(/\s+/).length;
        const mayuscula = texto.toUpperCase();

        return{
            content: [
                {
                    type: "text",
                    text: `Analisis del texto:
                    Caracteres: ${caracteres}
                    Palabras: ${palabras}
                    Mayuscula: ${mayuscula}`
                }
            ]
        }
    }
)

// 3. Iniciar el servidor mediante stdio
serveStdio(() => server);
