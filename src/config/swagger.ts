// config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

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
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],
    },
  apis: ["./src/routes/*.ts", "./src/routes/cart/*.ts"], // Include all route files
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
