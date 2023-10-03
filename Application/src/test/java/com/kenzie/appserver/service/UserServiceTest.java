package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.UserRepository;
import com.kenzie.appserver.repositories.model.UserRecord;
import com.kenzie.appserver.service.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;

    @BeforeEach
    public void setUp() {
        this.userRepository = mock(UserRepository.class);
        this.userService = new UserService(userRepository);
    }

    @Test
    public void whenFindingUserById_thenReturnUser() {
        // Given
        String userId = "1";
        UserRecord userRecord = new UserRecord(userId, "John Doe", "123");
        when(userRepository.findById(userId)).thenReturn(Optional.of(userRecord));

        // When
        User user = userService.findById(userId);

        // Then
        assertEquals(userId, user.getUserId());
        assertEquals("John Doe", user.getName());
        assertEquals("123", user.getUserNumber());
    }

    @Test
    public void whenFindingAllUsers_thenReturnUserList() {
        // Given
        List<UserRecord> userRecords = Arrays.asList(new UserRecord("1", "John Doe", "123"), new UserRecord("2", "Jane Smith", "456"));
        when(userRepository.findAll()).thenReturn(userRecords);

        // When
        List<User> users = userService.findAll();

        // Then
        assertEquals(2, users.size());
        assertEquals("1", users.get(0).getUserId());
//        assertEquals("John Doe", users.get(0).getName());
        assertEquals("123", users.get(0).getUserNumber());
        assertEquals("2", users.get(1).getUserId());
        assertEquals("Jane Smith", users.get(1).getName());
        assertEquals("456", users.get(1).getUserNumber());
    }

    @Test
    public void whenAddingNewUser_thenSaveUserRecord() {
        // Given
        User user = new User("1", "John Doe", "123");

        // When
        userService.addNewUser(user);

        // Then
        verify(userRepository, times(1)).save(any(UserRecord.class));
    }

    @Test
    public void whenUpdatingUser_thenSaveUpdatedUserRecord() {
        // Given
        User updatedUser = new User("1", "Updated Name", "789");
        UserRecord existingUserRecord = new UserRecord("1", "John Doe", "123");
        when(userRepository.findById("1")).thenReturn(Optional.of(existingUserRecord));

        // When
        userService.updateUser(updatedUser);

        // Then
        verify(userRepository, times(1)).save(any(UserRecord.class));
    }

    @Test
    public void whenDeletingUser_thenDeleteUserRecord() {
        // Given
        String userId = "1";
        UserRecord userRecord = new UserRecord(userId, "John Doe", "123");
        when(userRepository.findById(userId)).thenReturn(Optional.of(userRecord));

        // When
        userService.deleteUser(userId);

        // Then
        verify(userRepository, times(1)).deleteById(userId);
    }
}
