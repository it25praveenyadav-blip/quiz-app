package com.example.quiz_app;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:quizdb-test",
		"spring.datasource.username=sa",
		"spring.datasource.password="
})
class QuizAppApplicationTests {

	@DynamicPropertySource
	static void configureAdminPassword(DynamicPropertyRegistry registry) {
		registry.add("app.admin.password", () -> UUID.randomUUID().toString());
	}

	@Test
	void contextLoads() {
	}

}