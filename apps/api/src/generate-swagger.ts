import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "../src/app.module";
import { writeFileSync } from "fs";
import { join } from "path";

async function generate() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("AM Dashboard API")
    .setDescription("API do dashboard de cursos da A Mentoria ENEM")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addTag("auth", "Autenticação")
    .addTag("dashboard", "Dados do Dashboard")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outputPath = join(__dirname, "../../swagger.json");
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`Swagger JSON generated at: ${outputPath}`);
  await app.close();
}

generate();
