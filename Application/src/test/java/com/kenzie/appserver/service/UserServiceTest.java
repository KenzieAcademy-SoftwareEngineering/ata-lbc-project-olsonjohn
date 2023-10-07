package com.kenzie.appserver.service;

import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.repositories.UserRepository;
import com.kenzie.appserver.repositories.model.UserRecord;
import com.kenzie.appserver.service.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static java.util.UUID.randomUUID;
import static net.andreinc.mockneat.unit.user.Names.names;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setup() {
        userRepository = mock(UserRepository.class);
        userService = new UserService(userRepository);
    }

    @Test
    void findById_validId_returnsCorrectUser() {
     String id = randomUUID().toString();

        UserRecord record = new UserRecord();
        record.setUserId(id);
        record.setName(names().get());
        record.setUserNumber("1");

        when(userRepository.findById(id)).thenReturn(Optional.of(record));
        User user = userService.findById(id);

        assertNotNull(user, "A user object should be returned");
        assertEquals(record.getUserId(), user.getUserId(), "The id should match");
        assertEquals(record.getName(), user.getName(), "The name should match");
        assertEquals(record.getUserNumber(), user.getUserNumber(), "The userNumber should match");
    }

    @Test
    void findById_InvalidId_throwsException() {
        String id = randomUUID().toString();

        doThrow(ResourceNotFoundException.class).when(userRepository).findById(id);

        assertThrows(ResourceNotFoundException.class, () -> userService.findById(id), "Expected findById() to throw, but it didn't");
    }

    @Test
    void findAll() {
        UserRecord user1 = new UserRecord();
        user1.setUserId(randomUUID().toString());
        user1.setName(names().get());
        user1.setUserNumber("1");

        UserRecord user2 = new UserRecord();
        user2.setUserId(randomUUID().toString());
        user2.setName(names().get());
        user2.setUserNumber("2");

        List<UserRecord> users = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.findAll();

        assertEquals(2, result.size(), "List should contain 2 users");
        assertEquals(user1.getUserId(), result.get(0).getUserId(), "List order is maintained and user has correct id");
        assertEquals(user2.getUserId(), result.get(1).getUserId(), "List order is maintained and user has correct id");
    }

    @Test
    void addNewUser_validInputs_newUserAdded() {
        String id = randomUUID().toString();

        User user = new User();
        user.setUserId(id);
        user.setName(names().get());
        user.setUserNumber("1");

        UserRecord record = userService.createUserRecord(user);

        when(userRepository.save(record)).thenReturn(record);

        User result = userService.addNewUser(user);

        verify(userRepository).save(record); //verify that save was called with user record
        assertEquals(user, result, "User saved should match user returned");
    }

    @Test
    void updateUser_validInputs_userUpdated() {
        String id = randomUUID().toString();

        User updateUser = new User();
        updateUser.setUserId(id);
        updateUser.setName("NewName");
        updateUser.setUserNumber("1");

        UserRecord existingUserRecord = new UserRecord();
        existingUserRecord.setUserId(id);
        existingUserRecord.setName("OldName");
        existingUserRecord.setUserNumber("1");

        UserRecord updatedUserRecord = userService.createUserRecord(updateUser);

        when(userRepository.findById(id)).thenReturn(Optional.of(existingUserRecord));
        when(userRepository.save(updatedUserRecord)).thenReturn(updatedUserRecord);

        userService.updateUser(id, updateUser);

        verify(userRepository).findById(id);
        verify(userRepository).save(any(UserRecord.class));
        assertEquals("NewName", updatedUserRecord.getName(), "Existing user name should have been updated");
    }

    @Test
    void createUserRecord_nullUser_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> userService.createUserRecord(null),  "Exception should be thrown when user is null");
    }

    @Test
    void deleteUser_validId_deletesUser() {
        String id = randomUUID().toString();

        UserRecord record = new UserRecord();
        record.setUserId(id);
        record.setName(names().get());
        record.setUserNumber("1");

        when(userRepository.findById(id)).thenReturn(Optional.of(record));
        doNothing().when(userRepository).delete(record);

        userService.deleteUser(id);

        verify(userRepository).delete(record); //verify delete was called with user record
    }
}
