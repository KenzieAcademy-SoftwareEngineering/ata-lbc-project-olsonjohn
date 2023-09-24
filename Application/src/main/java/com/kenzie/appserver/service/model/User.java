package com.kenzie.appserver.service.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.Objects;
@DynamoDBDocument
public class User {
    private String id;
    private String name;
    private String userNumber;

    public User(String id, String userNumber, String name) {
        this.id = id;
        this.userNumber = userNumber;
        this.name = name;
    }

    public User(String id) {
        this.id = id;

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
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(userNumber, user.userNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, userNumber);
    }
}
