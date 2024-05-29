package com.shopbanquanao.JWTConfiguration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//               // .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
//                .allowedMethods("HEAD", "OPTIONS", "GET", "POST","DELETE" )
//                .maxAge(MAX_AGE_SECS);
    	registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000")
        .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
        .allowedHeaders("X-Auth-Token", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "*")
        .allowCredentials(true)
        .maxAge(MAX_AGE_SECS);
    }
}
