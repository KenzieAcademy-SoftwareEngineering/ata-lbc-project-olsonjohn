package com.kenzie.appserver.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kenzie.appserver.IntegrationTest;
import com.kenzie.appserver.controller.model.CustomerCreateRequest;
import com.kenzie.appserver.controller.model.CustomerResponse;
import com.kenzie.appserver.controller.model.CustomerUpdateRequest;
import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.service.CustomerService;
import com.kenzie.appserver.service.model.Customer;
import net.andreinc.mockneat.MockNeat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;


import java.util.List;

import static java.util.UUID.randomUUID;
import static net.andreinc.mockneat.unit.address.Addresses.addresses;
import static net.andreinc.mockneat.unit.user.Emails.emails;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.is;
import static net.andreinc.mockneat.unit.user.Names.names;
import static org.junit.Assert.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class CustomerControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    CustomerService customerService;
    private final MockNeat mockNeat = MockNeat.threadLocal();
    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void addNewCustomer_customerAdded() throws Exception {
        String firstName = names().first().get();
        String lastName = names().last().get();
        String address = addresses().get();
        String email = emails().get();
        String phoneNumber = "1-555-555-5555";

        CustomerCreateRequest customerCreateRequest = new CustomerCreateRequest();
        customerCreateRequest.setFirstName(firstName);
        customerCreateRequest.setLastName(lastName);
        customerCreateRequest.setAddress(address);
        customerCreateRequest.setEmailAddress(email);
        customerCreateRequest.setPhoneNumber(phoneNumber);

        mapper.registerModule(new JavaTimeModule());
        MvcResult result = mvc.perform(post("/customer")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(customerCreateRequest)))
                .andExpect(jsonPath("id")
                        .exists())
                .andExpect(jsonPath("firstName")
                        .value(is(firstName)))
                .andExpect(jsonPath("lastName")
                        .value(is(lastName)))
                .andExpect(jsonPath("address")
                        .value(is(address)))
                .andExpect(jsonPath("emailAddress")
                        .value(is(email)))
                .andExpect(jsonPath("phoneNumber")
                        .value(is(phoneNumber)))
                .andExpect(status().isCreated())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        CustomerResponse customerResponse = mapper.readValue(jsonResponse, CustomerResponse.class);
        String id = customerResponse.getId();

        mvc.perform(delete("customer/{id}", id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getCustomer_customerExists() throws Exception {
        String id = randomUUID().toString();
        String firstName = names().first().get();
        String lastName = names().last().get();
        String address = addresses().get();
        String email = emails().get();
        String phoneNumber = "1-555-555-5555";

        Customer customer = new Customer(
                id,
                firstName,
                lastName,
                address,
                email,
                phoneNumber);
        Customer persistedCustomer = customerService.addNewCustomer(customer);

        mvc.perform(get("/customer/{id}", persistedCustomer.getId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id")
                        .value(is(id)))
                .andExpect(jsonPath("firstName")
                        .value(is(firstName)))
                .andExpect(jsonPath("lastName")
                        .value(is(lastName)))
                .andExpect(jsonPath("address")
                        .value(is(address)))
                .andExpect(jsonPath("emailAddress")
                        .value(is(email)))
                .andExpect(jsonPath("phoneNumber")
                        .value(is(phoneNumber)))
                .andExpect(status().isOk());

        mvc.perform(delete("customer/{id}", id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getAllCustomers_customerListReturned() throws Exception {
        String id1 = randomUUID().toString();
        String firstName1 = names().first().get();
        String lastName1 = names().last().get();
        String address1 = addresses().get();
        String email1 = emails().get();
        String phoneNumber1 = "1-555-555-5555";

        Customer customer1 = new Customer(
                id1,
                firstName1,
                lastName1,
                address1,
                email1,
                phoneNumber1);
        Customer persistedCustomer1 = customerService.addNewCustomer(customer1);

        String id2 = randomUUID().toString();
        String firstName2 = names().first().get();
        String lastName2 = names().last().get();
        String address2 = addresses().get();
        String email2 = emails().get();
        String phoneNumber2 = "1-555-555-5555";

        Customer customer2 = new Customer(
                id2,
                firstName2,
                lastName2,
                address2,
                email2,
                phoneNumber2);
        Customer persistedCustomer2 = customerService.addNewCustomer(customer2);

        Integer numOfCustomers = customerService.findAll().size();

        ResultActions actions = mvc.perform(get("/customer/all")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mapper.registerModule(new JavaTimeModule());
        String responseBody = actions.andReturn().getResponse().getContentAsString();
        List<CustomerResponse> responses = mapper.readValue(responseBody, new TypeReference<List<CustomerResponse>>(){});
        assertThat(responses.size()).isEqualTo(numOfCustomers);

        mvc.perform(delete("customer/{id}", id1)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
        mvc.perform(delete("customer/{id}", id2)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void updateCustomer_updateSuccessful() throws Exception {
        String id = randomUUID().toString();
        String firstName = names().first().get();
        String lastName = names().last().get();
        String address = addresses().get();
        String email = emails().get();
        String phoneNumber = "1-555-555-5555";

        Customer customer = new Customer(
                id,
                firstName,
                lastName,
                address,
                email,
                phoneNumber);
        Customer persistedCustomer = customerService.addNewCustomer(customer);

        String newFirstName = names().first().get();
        String newLastName = names().last().get();
        String newAddress = addresses().get();
        String newEmail = emails().get();
        String newPhoneNumber = "1-555-555-5555";

        CustomerUpdateRequest customerUpdateRequest = new CustomerUpdateRequest();
        customerUpdateRequest.setFirstName(newFirstName);
        customerUpdateRequest.setLastName(newLastName);
        customerUpdateRequest.setAddress(newAddress);
        customerUpdateRequest.setEmailAddress(newEmail);
        customerUpdateRequest.setPhoneNumber(newPhoneNumber);

        mapper.registerModule(new JavaTimeModule());
        mvc.perform(put("/customer/{id}", persistedCustomer.getId())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(customerUpdateRequest)))
                .andExpect(jsonPath("id")
                        .exists())
                .andExpect(jsonPath("firstName")
                        .value(is(newFirstName)))
                .andExpect(jsonPath("lastName")
                        .value(is(newLastName)))
                .andExpect(jsonPath("address")
                        .value(is(newAddress)))
                .andExpect(jsonPath("emailAddress")
                        .value(is(newEmail)))
                .andExpect(jsonPath("phoneNumber")
                        .value(is(newPhoneNumber)))
                .andExpect(status().isOk());

        mvc.perform(delete("customer/{id}", id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void deleteCustomer_deleteSuccessful() throws Exception {
        String id = randomUUID().toString();
        String firstName = names().first().get();
        String lastName = names().last().get();
        String address = addresses().get();
        String email = emails().get();
        String phoneNumber = "1-555-555-5555";

        Customer customer = new Customer(
                id,
                firstName,
                lastName,
                address,
                email,
                phoneNumber);
        Customer persistedCustomer = customerService.addNewCustomer(customer);

        mvc.perform(delete("/customer/{id}", persistedCustomer.getId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        assertThrows(ResourceNotFoundException.class, () -> customerService.findById(id));
    }
}
