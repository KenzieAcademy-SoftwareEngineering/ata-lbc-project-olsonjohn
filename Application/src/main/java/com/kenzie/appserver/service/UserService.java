package com.kenzie.appserver.service;

import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.repositories.UserRepository;
import com.kenzie.appserver.repositories.model.UserRecord;
import com.kenzie.appserver.service.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(String id) {
        return userRepository
                .findById(id)
                .map(user -> new User(
                        user.getUserId(),
                        user.getUserNumber(),
                        user.getName()))
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + id));
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        userRepository
                .findAll()
                .forEach(user -> users.add(new User(
                        user.getUserId(),
                        user.getName(),
                        user.getUserNumber())));
        return users;
    }

    public User addNewUser(User user) {
        UserRecord userRecord = createUserRecord(user);
        userRepository.save(userRecord);
        return user;
    }

    public UserRecord createUserRecord(User user) {
        UserRecord userRecord = new UserRecord();
        userRecord.setUserNumber(user.getUserNumber());
        userRecord.setName(user.getName());
        userRecord.setUserId(user.getUserId());
        return userRecord;
    }

    public void updateUser(User updateUser) {
        User user = this.findById(updateUser.getUserId());
        user.setUserId(updateUser.getUserId());
        user.setName(updateUser.getName());
        user.setUserNumber(updateUser.getUserNumber());

        userRepository.save(createUserRecord(user));
    }

    public void deleteUser(String userId) {
        UserRecord userRecord = userRepository
                .findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + userId));
        userRepository.deleteById(userId);
    }
}
