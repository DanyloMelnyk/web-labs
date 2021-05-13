package ua.lviv.mel2.web_labs_back.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ua.lviv.mel2.web_labs_back.exceptions.UserNotFoundException;
import ua.lviv.mel2.web_labs_back.model.MyUser;
import ua.lviv.mel2.web_labs_back.model.MyUserDTO;
import ua.lviv.mel2.web_labs_back.services.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    UserService userService;
    PasswordEncoder encoder;

    public UserController(UserService userService, PasswordEncoder encoder) {
        this.userService = userService;
        this.encoder = encoder;
    }

    @GetMapping
    public List<MyUser> getUsers(@Valid @RequestParam(required = false) String email,
                                 @Valid @RequestParam(required = false) String firstName,
                                 @Valid @RequestParam(required = false) String lastName) {

        return userService.getUsers(email, firstName, lastName);
    }

    @GetMapping("/{id}")
    public MyUser getUser(@PathVariable Long id, Authentication authentication) {
        Object principal = authentication.getPrincipal();
        assert principal instanceof MyUser;


        return userService.getUser(id, (MyUser) principal).orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/current")
    public MyUser currentUser(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        assert principal instanceof MyUser;
        Long id = ((MyUser) principal).getId();
        return userService.getUser(id, (MyUser) principal).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/{id}")
    public MyUser updateUser(@Valid @RequestBody MyUserDTO userDTO, @PathVariable Long id, Authentication authentication) {
        Object principal = authentication.getPrincipal();
        assert principal instanceof MyUser;

        System.out.println(userDTO);

        MyUser user = userService.getUser(id, (MyUser) principal).orElseThrow(() -> new UserNotFoundException(id));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());

        return userService.updateUser(user, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
