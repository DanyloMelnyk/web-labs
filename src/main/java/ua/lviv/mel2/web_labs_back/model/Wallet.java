package ua.lviv.mel2.web_labs_back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class Wallet {
    @Id
    @GeneratedValue
    private Long id;

    private BigDecimal balance;
    private String name;
    private Currency currency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MyUser user;

    public Wallet() {
    }

    public Wallet(String name, Currency currency, BigDecimal balance, MyUser user) {
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @JsonIgnore
    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    @JsonProperty("user_id")
    public Long getUserId() {
        return user.getId();
    }

    @JsonProperty("user_name")
    public String getUserName() {
        return user.getUsername();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Wallet)) return false;
        Wallet wallet = (Wallet) o;
        return Objects.equals(id, wallet.id) && Objects.equals(balance, wallet.balance) && Objects.equals(name, wallet.name) && currency == wallet.currency && Objects.equals(user, wallet.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, balance, name, currency, user);
    }

    @Override
    public String toString() {
        return "Wallet{" +
                "id=" + id +
                ", balance=" + balance +
                ", name='" + name + '\'' +
                ", currency=" + currency +
                ", user=" + user +
                '}';
    }
}
