package com.mohamed.eams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class EamsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EamsBackendApplication.class, args);
	}

}
