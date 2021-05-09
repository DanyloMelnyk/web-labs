package ua.lviv.mel2.web_labs_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.lviv.mel2.web_labs_back.config.JwtTokenUtil;
import ua.lviv.mel2.web_labs_back.model.*;
import ua.lviv.mel2.web_labs_back.services.UserService;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/public")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;
    private final PasswordEncoder encoder;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserService userService, PasswordEncoder encoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public Token login(@RequestBody @Valid LoginDTO request) {
        System.out.println(request);
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        MyUser user = (MyUser) authenticate.getPrincipal();
        return new Token(jwtTokenUtil.generateAccessToken(user), user.getRole(), user.getId());
    }

    @PostMapping("/user")
    public ResponseEntity<MyUser> createUser(@Valid @RequestBody MyUserDTO userDTO) {
        MyUser user = new MyUser();
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
        user.setUserAuthStatus(UserAuthStatus.NOT_SIGNED_IN);

        Optional<MyUser> createdUser = userService.createUser(user);
        return createdUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body(null));
    }
}
