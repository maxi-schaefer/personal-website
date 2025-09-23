---
title: "Spring Authentication Guide"
description: "A step-by-step guide to implementing authentication in Spring Boot using Spring Security with code examples."
coverImage: "https://gokimax.dev/images/spring_authentication.png"
author: "Maxi Schäfer"
date: "2025-09-23"
readTime: "5 min"
---

Authentication is a critical part of any application that requires users to sign in. In this post, we’ll walk through how to implement **authentication in Spring Boot** using **Spring Security**. We’ll cover basic authentication, custom login pages, and securing REST APIs.

<br>

---

<br>

## 📌 What is Spring Security?

<br>

Spring Security is a powerful framework that provides **authentication, authorization, and protection against common attacks**. Out of the box, it comes with:

<br>

- Username/password authentication
- Role-based access control
- Session management
- CSRF protection

<br>

---

<br>

## 🛠️ Setting Up Spring Security

<br>

First, add the Spring Security starter to your `pom.xml` (Maven):

<br>

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

<br>

Or for **Gradle**:

<br>

```gradle
implementation 'org.springframework.boot:spring-boot-starter-security'
```
<br>

When you run your app now, Spring Security will:

<br>

1. Protect all endpoints by default.
2. Generate a default login form.
3. Require a password (you’ll find it in the logs).

<br>

---

<br>

## 🔐 Creating a Basic Security Configuration

<br>

Let’s customize the login flow by defining our own security filter chain.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll() // public endpoints
                .anyRequest().authenticated()              // everything else needs login
            )
            .formLogin(form -> form
                .loginPage("/login")        // custom login page
                .permitAll()
            )
            .logout(logout -> logout.permitAll());

        return http.build();
    }
}
```
<br>

---

<br>

## 👤 Adding a Custom User

<br>

To authenticate against a static user, you can configure an **in-memory user**:

<br>

```java
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Bean
public InMemoryUserDetailsManager userDetailsService() {
    UserDetails user = User
        .withDefaultPasswordEncoder()
        .username("john")
        .password("password")
        .roles("USER")
        .build();
    return new InMemoryUserDetailsManager(user);
}
```

<br>

No you can login with `john / password`

<br>

---

<br>

## 📡 Securing REST APIs with JWT

<br>

For REST APIs, sessions don't work well. Instead use **JWT (JSON Web Tokens)**

<br>

### Add JWT Dependencies

<br>

```gradle
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'
```

<br>

### Generate and Validate Tokens

<br>

```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "my-secret-key";

    public static String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }
}
```

<br>

---

<br>

## ✅ Conclusion

<br>

In this guide we covered:

<br>

- Adding **Spring Security** to a Spring Boot project
- Configuring **basic authentication**
- Implementing **JWT Authentication** for REST APIs

<br>

Spring Security is highly customizable, and this setup is a great starting point. From here, you can integrate **databases, OAuth2, and third-party login providers like Google or GitHub**.

<br>

👉 Want to learn more? Check out the official [Spring Security documentation](https://spring.io/projects/spring-security)