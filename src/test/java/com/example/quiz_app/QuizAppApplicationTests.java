package com.example.quiz_app;

import com.example.quiz_app.entity.QuizQuestion;
import com.example.quiz_app.repository.QuizQuestionRepository;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(
		webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
		properties = "spring.datasource.url=jdbc:h2:mem:quizdb-test")
@AutoConfigureMockMvc
class QuizAppApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private QuizQuestionRepository questionRepository;

	@LocalServerPort
	private int port;

	@Test
	void rootRedirectsToTheSignInPage() throws Exception {
		mockMvc.perform(get("/"))
				.andExpect(status().is3xxRedirection())
				.andExpect(header().string("Location", "/user/signin.html"));
	}

	@Test
	void healthCheckReturnsOk() throws Exception {
		mockMvc.perform(get("/health"))
				.andExpect(status().isOk());
	}

	@Test
	void h2ConsoleIsAvailableForBrowserAccess() throws Exception {
		HttpResponse<String> response = HttpClient.newHttpClient().send(
				HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/h2-console/"))
						.GET()
						.build(),
				HttpResponse.BodyHandlers.ofString());
		assertEquals(200, response.statusCode());
		assertEquals("SAMEORIGIN", response.headers().firstValue("X-Frame-Options").orElse(null));
		assertTrue(response.body().contains("H2 Console"));
	}

	@Test
	void frontendIsServedAsStaticContent() throws Exception {
		mockMvc.perform(get("/user/signin.html"))
				.andExpect(status().isOk());
		mockMvc.perform(get("/user/css/style.css"))
				.andExpect(status().isOk());
	}

	@Test
	void adminCanSaveListAndDeleteQuestionsInDatabase() throws Exception {
		mockMvc.perform(get("/api/admin/questions/sports"))
				.andExpect(status().isUnauthorized());

		mockMvc.perform(post("/api/admin/login")
				.contentType(APPLICATION_JSON)
				.content("{\"password\":\"PASSWORD123\"}"))
				.andExpect(status().isNoContent());

		mockMvc.perform(post("/api/admin/questions/sports")
				.header("X-Admin-Password", "PASSWORD123")
				.contentType(APPLICATION_JSON)
				.content("{\"text\":\"Database test question\",\"options\":[\"A\",\"B\",\"C\",\"D\"],\"correct\":2}"))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.text").value("Database test question"))
				.andExpect(jsonPath("$.options[2]").value("C"));

		QuizQuestion savedQuestion = questionRepository
				.findFirstByCategoryAndText("sports", "Database test question").orElseThrow();
		Long id = savedQuestion.getId();
		mockMvc.perform(get("/api/questions/sports"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[?(@.id == " + id + ")]").exists());

		mockMvc.perform(delete("/api/admin/questions/sports/" + id)
				.header("X-Admin-Password", "PASSWORD123"))
				.andExpect(status().isNoContent());
		mockMvc.perform(delete("/api/admin/questions/sports/" + id)
				.header("X-Admin-Password", "PASSWORD123"))
				.andExpect(status().isNotFound());
	}

	@Test
	void adminCannotCreateQuestionWithInvalidOptions() throws Exception {
		mockMvc.perform(post("/api/admin/questions/sports")
				.header("X-Admin-Password", "PASSWORD123")
				.contentType(APPLICATION_JSON)
				.content("{\"text\":\"Invalid question\",\"options\":[\"A\",\"B\"],\"correct\":4}"))
				.andExpect(status().isBadRequest());
	}
}
