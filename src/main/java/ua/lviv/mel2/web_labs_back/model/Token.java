package ua.lviv.mel2.web_labs_back.model;

import javax.validation.constraints.NotNull;

public class Token {
    @NotNull
    private String token;

    public Token(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
