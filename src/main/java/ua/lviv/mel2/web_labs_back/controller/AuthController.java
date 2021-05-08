package ua.lviv.mel2.web_labs_back.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.lviv.mel2.web_labs_back.config.JwtTokenUtil;
import ua.lviv.mel2.web_labs_back.model.LoginDTO;
import ua.lviv.mel2.web_labs_back.model.MyUser;
import ua.lviv.mel2.web_labs_back.model.Token;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/v1/public")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public Token login(@RequestBody @Valid LoginDTO request) {
        System.out.println(request);
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        MyUser user = (MyUser) authenticate.getPrincipal();
        return new Token(jwtTokenUtil.generateAccessToken(user));
    }
}
