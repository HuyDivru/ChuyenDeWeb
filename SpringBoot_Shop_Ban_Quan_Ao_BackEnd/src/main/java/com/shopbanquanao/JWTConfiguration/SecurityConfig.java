package com.shopbanquanao.JWTConfiguration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity 
 
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {
		@Autowired
	    CustomUserDetailsService customUserDetailsService;

	    @Autowired
	    private JwtAuthenticationEntryPoint unauthorizedHandler;

	    @Bean
	    public JwtAuthenticationFilter jwtAuthenticationFilter() {
	        return new JwtAuthenticationFilter();
	    }

	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
	        auth.userDetailsService(this.customUserDetailsService).passwordEncoder(passwordEncoder());
	     }

	    @Bean(BeanIds.AUTHENTICATION_MANAGER)
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
	        return authenticationConfiguration.getAuthenticationManager();
	    }
	    @Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	        http
	                .cors()
	                    .and()
	                .csrf()
	                    .disable()
	                .exceptionHandling()
	                    .authenticationEntryPoint(unauthorizedHandler)
	                    .and()
	                .sessionManagement()
	                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	                    .and()
	                .authorizeRequests((authorize) -> authorize
	                    .requestMatchers (antMatcher("/"),
	                    		antMatcher( "/favicon.ico"),
	                    		antMatcher("/**/*.png"),
	                    		antMatcher("/**/*.gif"),
	                    		antMatcher("/**/*.svg"),
	                    		antMatcher( "/**/*.jpg"),
	                    		antMatcher("/**/*.html"),
	                    		antMatcher("/**/*.css"),
	                    		antMatcher("/**/*.js"))
	                        .permitAll()
	                        .requestMatchers(antMatcher("/api/status/**"),antMatcher("/api/login/**"),antMatcher("/api/signup/**")).permitAll()
	                        .requestMatchers(antMatcher("/checkout"),antMatcher("/listProduct"),antMatcher("/saveProduct")).permitAll()
	                        .requestMatchers(antMatcher(HttpMethod.GET, "/api/status/**"))
	                        .permitAll()
	                        .requestMatchers(antMatcher(HttpMethod.GET, "/checkout"))
	                        .permitAll()
	                        .requestMatchers(antMatcher(HttpMethod.POST, "/listProduct"))
	                        .permitAll()
	                        .requestMatchers(antMatcher(HttpMethod.POST, "/saveProduct")).permitAll()

	                       
	                      .anyRequest()
	                        .authenticated());
	        

	        // Add our custom JWT security filter
	        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	        
	        return http.build();

	    }
	    
}
