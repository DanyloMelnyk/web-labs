package ua.lviv.mel2.web_labs_back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Entity
public class MyUser implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "Username cannot be null")
    private String username;

    private String firstName;
    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    private String phone;

    private String password;

    @Enumerated
    private UserAuthStatus userAuthStatus;

    private String role = "user";

    @OneToMany(mappedBy = "user")
    private List<Wallet> wallets; // NOT work? cant serialyze?

    public MyUser() {
    }

    public MyUser(String username, String password) {
        this.username = username;
        this.password = password;

        this.firstName = username.split("-")[0];
        this.lastName = "Lastname";
        this.email = username + "@gmail.com";
        this.phone = String.valueOf(Math.abs(new Random().nextLong() % 10000000000L) );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole()));
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public List<Wallet> getWallets() {
        return wallets;
    }

    public void setWallets(List<Wallet> wallets) {
        this.wallets = wallets;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public UserAuthStatus getUserAuthStatus() {
        return userAuthStatus;
    }

    public void setUserAuthStatus(UserAuthStatus userAuthStatus) {
        this.userAuthStatus = userAuthStatus;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "MyUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                ", userAuthStatus=" + userAuthStatus +
                ", role=" + role +
                '}';
    }
}
