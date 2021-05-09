package ua.lviv.mel2.web_labs_back.model;

import javax.validation.constraints.NotNull;

public class LoginResultDTO {
    @NotNull
    private String token;

    @NotNull
    private String role;

    @NotNull
    private Long id;

    public LoginResultDTO(String token, String role, Long id) {
        this.token = token;
        this.role = role;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
