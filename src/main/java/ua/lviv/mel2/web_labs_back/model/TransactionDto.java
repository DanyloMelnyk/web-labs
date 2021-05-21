package ua.lviv.mel2.web_labs_back.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class TransactionDto {
    @JsonAlias("recipient-username")
    @NotNull
    private String username;

    @JsonAlias("wallet-id")
    @NotNull
    private Long recipientWalletId;

    @NotNull
    private BigDecimal sum;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getRecipientWalletId() {
        return recipientWalletId;
    }

    public void setRecipientWalletId(Long recipientWalletId) {
        this.recipientWalletId = recipientWalletId;
    }

    public BigDecimal getSum() {
        return sum;
    }

    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

    @Override
    public String toString() {
        return "TransactionDto{" +
                "username='" + username + '\'' +
                ", RecipientWalletId=" + recipientWalletId +
                ", sum=" + sum +
                '}';
    }
}
