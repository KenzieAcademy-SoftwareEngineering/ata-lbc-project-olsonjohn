package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.UserCreateRequest;
import com.kenzie.appserver.controller.model.UserResponse;
import com.kenzie.appserver.controller.model.UserUpdateRequest;
import com.kenzie.appserver.service.UserService;
import com.kenzie.appserver.service.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;



@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get a User
     * @param id
     * @return user data
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> get(@PathVariable("id") String id) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserResponse userResponse = new UserResponse(user);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.findAll();

        List<UserResponse> responses = users.stream().map(UserResponse::new).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     *
     * @param userCreateRequest
     * @return URL with the user that was created.
     */
    @PostMapping
    public ResponseEntity<UserResponse> addNewUser(@RequestBody UserCreateRequest userCreateRequest) {
        User user = new User(UUID.randomUUID().toString(), userCreateRequest.getUserNumber(), userCreateRequest.getName());
        userService.addNewUser(user);

        UserResponse userResponse = new UserResponse(user);

        return ResponseEntity.created(URI.create("/user/" + userResponse.getUserId())).body(userResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");

// TODO: Add method to get all Users

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> userList = userService.getAllUsers();

        if(userList.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        List<UserResponse> responses = new ArrayList<>();
        for( User user: userList){
            responses.add(new UserResponse(user));
        }
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable("id")String userId, @RequestBody UserUpdateRequest userUpdateRequest) {
        User updatedUser = userService.findById(userId);
        updatedUser.setName(userUpdateRequest.getName());
        userService.updateUser(updatedUser);
        UserResponse userResponse = new UserResponse(updatedUser);
        return ResponseEntity.ok(userResponse);
    }
}

