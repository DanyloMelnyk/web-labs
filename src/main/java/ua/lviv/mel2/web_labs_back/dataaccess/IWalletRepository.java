package ua.lviv.mel2.web_labs_back.dataaccess;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.lviv.mel2.web_labs_back.model.MyUser;
import ua.lviv.mel2.web_labs_back.model.Wallet;

import java.util.List;

public interface IWalletRepository extends JpaRepository<Wallet, Long> {
    List<Wallet> findAllByUser(MyUser username);
}
