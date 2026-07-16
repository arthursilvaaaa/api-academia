package com.api.academia.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI academiaOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Academia API")
                        .description("API REST para gerenciamento de alunos, aulas, instrutores e matrículas.")
                        .version("v1"))
                .externalDocs(new ExternalDocumentation()
                        .description("GitHub")
                        .url("https://github.com/"));
    }
}
