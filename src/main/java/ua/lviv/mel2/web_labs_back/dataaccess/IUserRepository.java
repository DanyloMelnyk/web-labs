package ua.lviv.mel2.web_labs_back.dataaccess;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.lviv.mel2.web_labs_back.model.MyUser;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<MyUser, Long>, JpaSpecificationExecutor<MyUser> {
    Optional<MyUser> findByUsername(String username);
}
