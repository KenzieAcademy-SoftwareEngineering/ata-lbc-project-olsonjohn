package com.kenzie.appserver.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kenzie.appserver.IntegrationTest;
import com.kenzie.appserver.controller.model.UserCreateRequest;
import com.kenzie.appserver.controller.model.UserResponse;
import com.kenzie.appserver.controller.model.UserUpdateRequest;
import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.service.UserService;
import com.kenzie.appserver.service.model.User;
import net.andreinc.mockneat.MockNeat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static java.util.UUID.randomUUID;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.is;
import static net.andreinc.mockneat.unit.user.Names.names;
import static org.junit.Assert.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@IntegrationTest
public class UserControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    UserService userService;
    private final MockNeat mockneat = MockNeat.threadLocal();
    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void addNewUser_userAdded() throws Exception {
        String name = names().get();
        String num = "1";

        UserCreateRequest userCreateRequest = new UserCreateRequest();
        userCreateRequest.setName(name);
        userCreateRequest.setUserNumber(num);

        mapper.registerModule(new JavaTimeModule());
        mvc.perform(post("/user")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(userCreateRequest)))
                .andExpect(jsonPath("userId")
                        .exists())
                .andExpect(jsonPath("name")
                        .value(is(name)))
                .andExpect(jsonPath("userNumber")
                        .value(is("1")))
                .andExpect(status().isCreated());
    }

    @Test
    public void getUser_userExists() throws Exception {
        String id = randomUUID().toString();
        String name = names().get();
        String num = "1";

        User user = new User(id, num, name);
        User persistedUser = userService.addNewUser(user);

        mvc.perform(get("/user/{id}", persistedUser.getUserId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("userId")
                        .value(is(id)))
                .andExpect(jsonPath("name")
                        .value(is(name)))
                .andExpect(jsonPath("userNumber")
                        .value(is(num)))
                .andExpect(status().isOk());
    }

    @Test
    public void getAllUsers_userListReturned() throws Exception {
        String id1 = randomUUID().toString();
        String name1 = names().get();
        String num1 = "1";
        User user1 = new User(id1, num1, name1);
        User persistedUser1 = userService.addNewUser(user1);

        String id2 = randomUUID().toString();
        String name2 = names().get();
        String num2 = "2";
        User user2 = new User(id2, num2, name2);
        User persistedUser2 = userService.addNewUser(user2);

        ResultActions actions = mvc.perform(get("/user/all")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mapper.registerModule(new JavaTimeModule());
        String responseBody = actions.andReturn().getResponse().getContentAsString();
        List<UserResponse> responses = mapper.readValue(responseBody, new TypeReference<List<UserResponse>>(){});
        assertThat(responses.size()).isEqualTo(2);
    }

    @Test
    public void updateUser_updateSuccessful() throws Exception {
        String id = randomUUID().toString();
        String name = names().get();
        String num = "1";

        User user = new User(id, num, name);
        User persistedUser = userService.addNewUser(user);

        String newName = names().get();

        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setName(newName);

        mapper.registerModule(new JavaTimeModule());
        mvc.perform(put("/user/{id}", persistedUser.getUserId())
                    .accept(MediaType.APPLICATION_JSON)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(userUpdateRequest)))
                .andExpect(jsonPath("userId")
                        .exists())
                .andExpect(jsonPath("name")
                        .value(is(newName)))
                .andExpect(jsonPath("userNumber")
                        .exists())
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUser_deleteSuccessful() throws Exception {
        String id = randomUUID().toString();
        String name = names().get();
        String num = "1";

        User user = new User(id, num, name);
        User persistedUser = userService.addNewUser(user);

        mvc.perform(delete("/user/{id}", persistedUser.getUserId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        assertThrows(ResourceNotFoundException.class, () -> userService.findById(id));
    }
}
