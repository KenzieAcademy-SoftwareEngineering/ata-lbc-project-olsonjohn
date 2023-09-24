package com.kenzie.appserver.converter;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.kenzie.appserver.service.UserService;
import com.kenzie.appserver.service.model.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class UserListConverter implements DynamoDBTypeConverter<String, List<User>> {

    private UserService userService;

    @Override
    public String convert(List<User> userList) {
        ArrayList<String> output = new ArrayList<>();
        userList.forEach(user -> output.add(user.getId()));
        return Arrays.toString(output.toArray());
    }

    @Override
    public List<User> unconvert(String object) {
        String[] tempList = object.split(",");
        ArrayList userIdList = new ArrayList<>(Arrays.asList(tempList));
        ArrayList<User> output = new ArrayList<>();
        userIdList.forEach(userId -> output.add(userService.findById((String) userId)));
        return output;
    }
}