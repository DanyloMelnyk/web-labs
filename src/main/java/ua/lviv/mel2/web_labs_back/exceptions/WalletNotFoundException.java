package ua.lviv.mel2.web_labs_back.exceptions;

public class WalletNotFoundException extends RuntimeException {
    public WalletNotFoundException(Long id) {
        super("Could not find wallet with id " + id);
    }

    public WalletNotFoundException(String msg, Long id) {
        super(msg + id);
    }

    public WalletNotFoundException(String msg) {
        super(msg);
    }
}
