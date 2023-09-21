package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.UserRepository;
import com.kenzie.appserver.repositories.model.UserRecord;
import com.kenzie.appserver.service.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(String id) {
        return userRepository.findById(id).map(user -> new User(user.getId(), user.getUserNumber(), user.getName())).orElse(null);
    }

    public User addNewUser(User user) {
        UserRecord userRecord = createUserRecord(user);
        userRepository.save(userRecord);
        return user;
    }

    private UserRecord createUserRecord(User user) {
        UserRecord userRecord = new UserRecord();
        userRecord.setUserNumber(user.getUserNumber());
        userRecord.setName(user.getName());
        userRecord.setId(user.getId());
        return userRecord;
    }
}
