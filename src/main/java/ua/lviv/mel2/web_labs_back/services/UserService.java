package ua.lviv.mel2.web_labs_back.services;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ua.lviv.mel2.web_labs_back.dataaccess.IUserRepository;
import ua.lviv.mel2.web_labs_back.model.MyUser;
import ua.lviv.mel2.web_labs_back.model.UserSpecifications;

import java.util.List;
import java.util.Optional;

@Component
public class UserService implements UserDetailsService {
    final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<MyUser> createUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return Optional.empty();
        }

        return Optional.of(userRepository.save(user));
    }

    public List<MyUser> getUsers(String email, String firstName, String lastName) {
        Specification<MyUser> specification = null;

        if (email != null) {
            specification = UserSpecifications.hasEmail(email);
        }

        if (firstName != null) {
            specification = specification != null ? specification.and(UserSpecifications.hasFirstName(firstName)) : UserSpecifications.hasFirstName(firstName);
        }
        if (lastName != null) {
            specification = specification != null ? specification.and(UserSpecifications.hasLastName(lastName)) : UserSpecifications.hasLastName(lastName);
        }

        return userRepository.findAll(specification);
    }

    public Optional<MyUser> getUser(Long id, MyUser curUser) {
        if (curUser.getId().equals(id) || curUser.getRole().equals("admin"))
            return userRepository.findById(id);

        return Optional.empty();
    }

    public MyUser updateUser(MyUser newUser, Long id) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(newUser.getEmail());
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setUserAuthStatus(newUser.getUserAuthStatus());
            user.setPhone(newUser.getPhone());
            user.setUsername(newUser.getUsername());
            user.setRole(newUser.getRole());

            return userRepository.save(user);
        }).orElseGet(() -> {
            newUser.setId(id);
            return userRepository.save(newUser);
        });
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
