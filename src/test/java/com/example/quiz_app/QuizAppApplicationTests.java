package com.example.quiz_app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:quizdb-test",
		"spring.datasource.username=sa",
		"spring.datasource.password="
})
class QuizAppApplicationTests {

	@Test
	void contextLoads() {
	}

}