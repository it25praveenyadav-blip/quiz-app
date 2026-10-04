error id: file:///C:/Users/USER/Downloads/quiz-app/src/main/java/com/example/quiz_app/respository/UserRespository.java:
file:///C:/Users/USER/Downloads/quiz-app/src/main/java/com/example/quiz_app/respository/UserRespository.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 212
uri: file:///C:/Users/USER/Downloads/quiz-app/src/main/java/com/example/quiz_app/respository/UserRespository.java
text:
```scala
package com.example.quiz_app.repository;

import com.example.quiz_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository@@ extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: 