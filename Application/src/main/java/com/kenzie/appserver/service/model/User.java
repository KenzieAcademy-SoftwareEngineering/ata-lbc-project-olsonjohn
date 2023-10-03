package com.kenzie.appserver.service.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.Objects;
@DynamoDBDocument
public class User {
    private String userId;
    private String name;
    private String userNumber;

    public User(String userId, String name, String userNumber) {
        this.userId = userId;
        this.userNumber = userNumber;
        this.name = name;
    }

//    public User(String userId) {
//        this.userId = userId;
//
//    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        return Objects.equals(userId, user.userId) && Objects.equals(name, user.name) && Objects.equals(userNumber, user.userNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, name, userNumber);
    }
}
