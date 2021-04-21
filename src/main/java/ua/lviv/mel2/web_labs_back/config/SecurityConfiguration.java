package ua.lviv.mel2.web_labs_back.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ua.lviv.mel2.web_labs_back.services.UserService;

@Configuration
@EnableConfigurationProperties
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/styles/*").permitAll() // стилі
                .antMatchers("/*.js").permitAll()
                .antMatchers("/sign-up").permitAll() // сторінка реєстрації
                .antMatchers("/wallet/*/edit").hasAuthority("admin")
                .antMatchers(HttpMethod.POST, "/api/v1/user").permitAll() // API endpoint реєстрації
                .antMatchers(HttpMethod.GET, "/api/v1/user").hasAuthority("admin")
                .antMatchers(HttpMethod.PUT, "/api/v1/wallet/*").hasAuthority("admin")
                .antMatchers("/user").hasAuthority("admin")
                .anyRequest().authenticated()
                .and()

                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout().permitAll();
    }

    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
