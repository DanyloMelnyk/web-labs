package ua.lviv.mel2.web_labs_back;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ua.lviv.mel2.web_labs_back.dataaccess.IUserRepository;
import ua.lviv.mel2.web_labs_back.dataaccess.IWalletRepository;
import ua.lviv.mel2.web_labs_back.model.MyUser;
import ua.lviv.mel2.web_labs_back.model.Wallet;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static ua.lviv.mel2.web_labs_back.model.Currency.UAH;
import static ua.lviv.mel2.web_labs_back.model.Currency.USD;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Bean
    CommandLineRunner initDatabase(IWalletRepository walletRepository, IUserRepository userRepository) {
        return args -> {
            List<MyUser> users = Arrays.asList(
                    new MyUser("user", encoder.encode("pass")),
                    new MyUser("admin", encoder.encode("pass")));

            users.get(1).setRole("admin");

            users = users.stream().map(user -> {
                MyUser u = userRepository.save(user);
                log.info(String.format("Preloading %s", u));
                return u;
            }).collect(Collectors.toList());

            List<Wallet> wallets = Arrays.asList(
                    new Wallet("Wallet 1", USD, BigDecimal.valueOf(25.5), users.get(0)),
                    new Wallet("Wallet 2", UAH, BigDecimal.valueOf(2700), users.get(0)),
                    new Wallet("Wallet 3", USD, BigDecimal.valueOf(0), users.get(0)),
                    new Wallet("Wallet 4", UAH, BigDecimal.valueOf(200), users.get(1)),
                    new Wallet("Wallet 5", USD, BigDecimal.valueOf(2030.25), users.get(1)),
                    new Wallet("Wallet 6", UAH, BigDecimal.valueOf(1000), users.get(1))
            );

            wallets.forEach(wallet -> {
                Wallet w = walletRepository.save(wallet);
                log.info(String.format("Preloading %s", w));
            });
        };
    }
}
