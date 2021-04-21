package ua.lviv.mel2.web_labs_back.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.math.BigDecimal;

public class NewWalletDto {
    @JsonAlias("wallet-name")
    private String walletName;

    private Currency currency;

    private BigDecimal balance;

    public String getWalletName() {
        return walletName;
    }

    public void setWalletName(String walletName) {
        this.walletName = walletName;
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

    @Override
    public String toString() {
        return "NewWalletDto{" +
                "walletName='" + walletName + '\'' +
                ", currency=" + currency +
                ", balance=" + balance +
                '}';
    }
}
