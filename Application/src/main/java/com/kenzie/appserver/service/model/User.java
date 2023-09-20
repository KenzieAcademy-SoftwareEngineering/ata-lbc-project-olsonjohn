package com.kenzie.appserver.service.model;

import java.util.Objects;

public class User {
    private String id;
    private String name;
    private String userId;
    private String userNumber;

    public User(String id, String userId, String userNumber, String name) {
        this.id = id;
        this.userId = userId;
        this.userNumber = userNumber;
        this.name = name;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(String userNumber) {
        this.userNumber = userNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id)
                && Objects.equals(name, user.name)
                && Objects.equals(userId, user.userId)
                && Objects.equals(userNumber, user.userNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, userId, userNumber);
    }
}
