package ua.lviv.mel2.web_labs_back.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;
import ua.lviv.mel2.web_labs_back.exceptions.ForbiddenException;
import ua.lviv.mel2.web_labs_back.model.MyUser;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String index() {
        return "wallets";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/sign-up")
    public String signUp() {
        return "sign-up";
    }

    @RequestMapping("/user/{id}")
    public String userPage(@PathVariable Long id, Authentication authentication) {
        MyUser user = (MyUser) authentication.getPrincipal();
        if (!user.getId().equals(id) && !user.getRole().equals("admin")) {
            throw new ForbiddenException();
        }
        return "user";
    }

    @RequestMapping("/user/{id}/edit")
    public String editUser(@PathVariable Long id) {
        return "edit-user";
    }

    @RequestMapping("/user/current")
    public RedirectView curUserPage(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        assert principal instanceof MyUser;
        MyUser user = (MyUser) principal;

        return new RedirectView("/user/" + user.getId());
    }

    @RequestMapping("/user")
    public String users() {
        return "users";
    }

    @RequestMapping("/wallet/{id}")
    public String wallet(@PathVariable Long id) {
        return "wallet";
    }

    @RequestMapping("/wallet/{id}/send")
    public String send(@PathVariable Long id) {
        return "create-transaction";
    }

    @RequestMapping("/wallet/{id}/edit")
    public String editWallet(@PathVariable Long id) {
        return "edit-wallet";
    }

    @RequestMapping("/wallet/create")
    public String createWallet() {
        return "create-wallet";
    }
}
