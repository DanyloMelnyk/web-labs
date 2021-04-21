package ua.lviv.mel2.web_labs_back.model;

import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {
    private UserSpecifications() {
    }

    public static Specification<MyUser> hasEmail(String email) {
        return (root, query, builder) -> builder.equal(root.get(MyUser_.email), email);
    }

    public static Specification<MyUser> hasFirstName(String email) {
        return (root, query, builder) -> builder.equal(root.get(MyUser_.firstName), email);
    }

    public static Specification<MyUser> hasLastName(String email) {
        return (root, query, builder) -> builder.equal(root.get(MyUser_.lastName), email);
    }
}
