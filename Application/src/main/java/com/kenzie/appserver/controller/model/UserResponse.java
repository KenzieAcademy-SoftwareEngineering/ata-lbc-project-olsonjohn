package com.kenzie.appserver.controller.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenzie.appserver.service.model.User;

import javax.validation.constraints.NotEmpty;

public class UserResponse {
    @NotEmpty
    @JsonProperty("userNumber")
    private String userNumber;
    @JsonProperty("name")
    private String name;
    @JsonProperty("userId")
    private String userId;

    public UserResponse() {}

    public UserResponse(User user) {
        this.userId = user.getUserId();
        this.userNumber = user.getUserNumber();
        this.name = user.getName();
    }

    public String getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(String userNumber) {
        this.userNumber = userNumber;
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
}
