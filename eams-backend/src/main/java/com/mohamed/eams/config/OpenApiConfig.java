package com.mohamed.eams.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI eamsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Enterprise Asset Management API")
                        .description("REST API for tracking corporate hardware and software assets.")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("John Doe")
                                .email("John.Doe@company.com")));
    }
}
