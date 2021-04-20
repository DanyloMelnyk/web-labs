package ua.lviv.mel2.web_labs_back.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ua.lviv.mel2.web_labs_back.dataaccess.IUserRepository;
import ua.lviv.mel2.web_labs_back.dataaccess.IWalletRepository;
import ua.lviv.mel2.web_labs_back.exceptions.WalletNotFoundException;
import ua.lviv.mel2.web_labs_back.model.MyUser;
import ua.lviv.mel2.web_labs_back.model.NewWalletDto;
import ua.lviv.mel2.web_labs_back.model.TransactionDto;
import ua.lviv.mel2.web_labs_back.model.Wallet;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/wallet")
public class WalletController {
    private final IWalletRepository repository;
    private final IUserRepository userRepository;

    public WalletController(IWalletRepository repository, IUserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Wallet> getWallets(Authentication authentication) {
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        MyUser user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return repository.findAllByUser(user);
    }

    @PostMapping
    public Wallet createWallet(@Valid @RequestBody NewWalletDto newWallet, Authentication authentication) {
        Wallet wallet = new Wallet();

        wallet.setName(newWallet.getWalletName());
        wallet.setCurrency(newWallet.getCurrency());

        wallet.setBalance(BigDecimal.ZERO);
        wallet.setUser((MyUser) authentication.getPrincipal());

        return repository.save(wallet);
    }

    @GetMapping("/{id}")
    public Wallet getWallet(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new WalletNotFoundException(id));
    }

    @PutMapping("/{id}")
    public Wallet updateWallet(@Valid @RequestBody NewWalletDto newWallet, @PathVariable Long id) {
        Wallet wallet = repository.findById(id).orElseThrow(() -> new WalletNotFoundException(id));
        wallet.setName(newWallet.getWalletName());
        wallet.setCurrency(newWallet.getCurrency());
        wallet.setBalance(newWallet.getBalance());

        return repository.save(wallet);
    }

    @DeleteMapping("/{id}")
    public void deleteWallet(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PostMapping("/{senderId}/send")
    public Wallet createTransaction(@PathVariable Long senderId, @Valid @RequestBody TransactionDto transaction, Authentication authentication) {
        long userId = ((MyUser) authentication.getPrincipal()).getId();
        Wallet sender = repository.findById(senderId).orElseThrow(() -> new WalletNotFoundException(senderId));
        if (sender.getUserId() != userId) {
            throw new WalletNotFoundException(senderId);
        }

        if (sender.getBalance().compareTo(transaction.getSum()) < 0) {
            return sender;
        }

        Wallet receiver = repository.findById(transaction.getRecipientWalletId()).orElseThrow(() -> new WalletNotFoundException(transaction.getRecipientWalletId()));
        if (!receiver.getUser().getUsername().equals(transaction.getUsername())) {

            throw new WalletNotFoundException(transaction.getRecipientWalletId());
        }

        if (receiver.getCurrency() != sender.getCurrency()) {
            throw new WalletNotFoundException(transaction.getRecipientWalletId());
        }

        sender.setBalance(sender.getBalance().subtract(transaction.getSum()));
        receiver.setBalance(receiver.getBalance().add(transaction.getSum()));

        Wallet result = repository.save(sender);
        repository.save(receiver);

        return result;
    }
}
