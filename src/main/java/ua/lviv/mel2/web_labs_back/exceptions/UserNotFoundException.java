package ua.lviv.mel2.web_labs_back.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Could not find user with id " + id);
    }
}
