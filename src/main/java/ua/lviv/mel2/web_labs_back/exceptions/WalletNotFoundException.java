package ua.lviv.mel2.web_labs_back.exceptions;

public class WalletNotFoundException extends RuntimeException {
    public WalletNotFoundException(Long id) {
        super("Could not find wallet with id " + id);
    }
}
