package com.kenzie.appserver.converter;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.kenzie.appserver.repositories.UserRepository;
import com.kenzie.appserver.service.UserService;
import com.kenzie.appserver.service.model.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//public class UserListConverter implements DynamoDBTypeConverter<String, List<User>> {

//    @Override
//    public String convert(List<User> userList) {
//        if (userList.isEmpty()) {
//            return "[]";
//        }
//        ArrayList<String> output = new ArrayList<>();
//        userList.forEach(user -> output.add(user.getUserId()));
//        return Arrays.toString(output.toArray());
//    }
//
//    @Override
//    public List<User> unconvert(String object) {
//        if(object.equals("[]")) {
//            return new ArrayList<>();
//        }
//        String[] tempList = object.replaceAll("\\[","").replaceAll("\\]","").split(",");
//        ArrayList userIdList = new ArrayList<>(Arrays.asList(tempList));
//        ArrayList<User> output = new ArrayList<>();
//        userIdList.forEach(userId -> output.add(new User(userId.toString())));
//        return output;
//    }
//}