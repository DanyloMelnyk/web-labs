package ua.lviv.mel2.web_labs_back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import ua.lviv.mel2.web_labs_back.JwtTokenFilter;
import ua.lviv.mel2.web_labs_back.services.UserService;

//@Configuration
//@EnableConfigurationProperties
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        //securedEnabled = true,
        jsr250Enabled = true
        //prePostEnabled = true
)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final UserService userService;
    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfiguration(UserService userService, JwtTokenFilter jwtTokenFilter) {
        this.userService = userService;
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/styles/*").permitAll() // стилі
                .antMatchers("/built/bundle.js").permitAll()
                .antMatchers("/api/v1/public/*").permitAll()
                .antMatchers("/*").permitAll()
//                .antMatchers("/sign-up").permitAll() // сторінка реєстрації
//                .antMatchers("/wallet/*/edit").hasAuthority("admin")
//                .antMatchers(HttpMethod.POST, "/api/v1/user").permitAll() // API endpoint реєстрації
//                .antMatchers(HttpMethod.GET, "/api/v1/user").hasAuthority("admin")
//                .antMatchers(HttpMethod.PUT, "/api/v1/wallet/*").hasAuthority("admin")
//                .antMatchers("/user").hasAuthority("admin")
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
//
//                .formLogin()
//                .permitAll()
//                .and()
//                .logout().permitAll();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}