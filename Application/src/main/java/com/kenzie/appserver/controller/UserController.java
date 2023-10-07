package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.UserCreateRequest;
import com.kenzie.appserver.controller.model.UserResponse;
import com.kenzie.appserver.controller.model.UserUpdateRequest;
import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.service.UserService;
import com.kenzie.appserver.service.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;



@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     *
     * @param userCreateRequest
     * @return URL with the user that was created.
     */
    @PostMapping
    public ResponseEntity<UserResponse> addNewUser(@RequestBody UserCreateRequest userCreateRequest) {
        try {
            User user = new User(userCreateRequest);
            userService.addNewUser(user);
            UserResponse userResponse = new UserResponse(user);
            return ResponseEntity.created(URI.create("/user/" + userResponse.getUserId())).body(userResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get a User
     * @param id
     * @return user data
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("id") String id) {
        try {
            User user = userService.findById(id);
            UserResponse userResponse = new UserResponse(user);
            return ResponseEntity.ok(userResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        try {
            List<User> userList = userService.findAll();
            if (userList.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<UserResponse> responses = new ArrayList<>();
            for (User user : userList) {
                responses.add(new UserResponse(user));
            }
            return ResponseEntity.ok(responses);
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable("id")String userId, @RequestBody UserUpdateRequest userUpdateRequest) {
        try {
            User user = new User(userUpdateRequest);
            User updatedUser = userService.updateUser(userId, user);
            UserResponse userResponse = new UserResponse(updatedUser);
            return ResponseEntity.ok(userResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")String userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch(ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

