package ua.lviv.mel2.web_labs_back.model;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(MyUser.class)
public class MyUser_ {
    public static SingularAttribute<MyUser, String> email;
    public static SingularAttribute<MyUser, String> firstName;
    public static SingularAttribute<MyUser, String> lastName;
}
