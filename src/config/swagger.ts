// config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Shopping Cart API",
        version: "1.0.0",
        description: "API documentation for the Shopping Cart backend",
      },
      servers: [
        {
          url: "https://cart-api-k25e.onrender.com",
          description: "Production Server",
        },
      ],
    },
    // Use absolute paths so swagger-jsdoc can find files whether running via ts-node or node
    // scan all route files (including nested folders) for JSDoc Swagger comments
    apis: [path.resolve(__dirname, "../routes/**/*.ts"), path.resolve(__dirname, "../routes/**/*.js")],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
