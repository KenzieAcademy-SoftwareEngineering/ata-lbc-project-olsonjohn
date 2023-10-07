package com.kenzie.appserver.service;

import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.repositories.CustomerRepository;
import com.kenzie.appserver.repositories.model.CustomerRecord;
import com.kenzie.appserver.service.model.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static java.util.UUID.randomUUID;
import static net.andreinc.mockneat.unit.address.Addresses.addresses;
import static net.andreinc.mockneat.unit.user.Emails.emails;
import static net.andreinc.mockneat.unit.user.Names.names;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CustomerServiceTest {
    private CustomerRepository customerRepository;
    private CustomerService customerService;

    @BeforeEach
    void setup() {
        customerRepository = mock(CustomerRepository.class);
        customerService = new CustomerService(customerRepository);
    }

    @Test
    void findById_validId_returnsCorrectCustomer() {
        String id = randomUUID().toString();

        CustomerRecord record = new CustomerRecord();
        record.setId(id);
        record.setFirstName(names().first().get());
        record.setLastName(names().last().get());
        record.setAddress(addresses().get());
        record.setPhoneNumber("1-555-555-5555");
        record.setEmailAddress(emails().get());

        when(customerRepository.findById(id)).thenReturn(Optional.of(record));
        Customer customer = customerService.findById(id);

        assertNotNull(customer, "A customer object should be returned");
        assertEquals(record.getId(), customer.getId(), "The id should match");
        assertEquals(record.getFirstName(), customer.getFirstName(), "The first name should match");
        assertEquals(record.getLastName(), customer.getLastName(), "The last name should match");
        assertEquals(record.getAddress(), customer.getAddress(), "The address should match");
        assertEquals(record.getPhoneNumber(), customer.getPhoneNumber(), "The phone number should match");
        assertEquals(record.getEmailAddress(), customer.getEmailAddress(), "The email address should match");
    }

    @Test
    void findById_InvalidId_throwsException() {
        String id = randomUUID().toString();

        doThrow(ResourceNotFoundException.class).when(customerRepository).findById(id);

        assertThrows(ResourceNotFoundException.class, () -> customerService.findById(id), "Expected findById() to throw, but it didn't");
    }

    @Test
    void findAll_returnsAllCustomers() {
        CustomerRecord customer1 = new CustomerRecord();
        customer1.setId(randomUUID().toString());
        customer1.setFirstName(names().first().get());
        customer1.setLastName(names().last().get());
        customer1.setAddress(addresses().get());
        customer1.setPhoneNumber("1-555-555-5555");
        customer1.setEmailAddress(emails().get());

        CustomerRecord customer2 = new CustomerRecord();
        customer2.setId(randomUUID().toString());
        customer2.setFirstName(names().first().get());
        customer2.setLastName(names().last().get());
        customer2.setAddress(addresses().get());
        customer2.setPhoneNumber("1-555-555-5555");
        customer2.setEmailAddress(emails().get());

        List<CustomerRecord> customers = Arrays.asList(customer1, customer2);

        when(customerRepository.findAll()).thenReturn(customers);

        List<Customer> result = customerService.findAll();

        assertEquals(2, result.size(), "List should contain 2 customers");
        assertEquals(customer1.getId(), result.get(0).getId(), "List order is maintained and customer has correct id");
        assertEquals(customer2.getId(), result.get(1).getId(), "List order is maintained and customer has correct id");
    }

    @Test
    void addNewCustomer_validInputs_newCustomerAdded() {
        String id = randomUUID().toString();

        Customer customer = new Customer();
        customer.setId(id);
        customer.setFirstName(names().first().get());
        customer.setLastName(names().last().get());
        customer.setAddress(addresses().get());
        customer.setPhoneNumber("1-555-555-5555");
        customer.setEmailAddress(emails().get());

        CustomerRecord record = customerService.createCustomerRecord(customer);

        when(customerRepository.save(record)).thenReturn(record);

        Customer result = customerService.addNewCustomer(customer);

        verify(customerRepository).save(record); //Verify that save was called with customer record
        assertEquals(customer, result, "Customer saved should match customer returned");
    }

    @Test
    void updateCustomer_validInputs_customerUpdated(){
        String id = randomUUID().toString();

        Customer updateCustomer = new Customer();
        updateCustomer.setId(id);
        updateCustomer.setFirstName("NewFirstName");
        updateCustomer.setLastName("NewLastName");
        updateCustomer.setAddress("NewAddress");
        updateCustomer.setPhoneNumber("1-555-555-5555");
        updateCustomer.setEmailAddress("new@example.com");

        CustomerRecord existingCustomerRecord = new CustomerRecord();
        existingCustomerRecord.setId(id);
        existingCustomerRecord.setFirstName("OldFirstName");
        existingCustomerRecord.setLastName("OldLastName");
        existingCustomerRecord.setAddress("OldAddress");
        existingCustomerRecord.setPhoneNumber("1-555-555-5555");
        existingCustomerRecord.setEmailAddress("old@example.com");

        CustomerRecord updatedCustomerRecord = customerService.createCustomerRecord(updateCustomer);

        when(customerRepository.findById(id)).thenReturn(Optional.of(existingCustomerRecord));
        when(customerRepository.save(updatedCustomerRecord)).thenReturn(updatedCustomerRecord);

        customerService.updateCustomer(id, updateCustomer);

        verify(customerRepository).findById(id); //verify findById() was called with id
        verify(customerRepository).save(any(CustomerRecord.class)); //verify save() was called with a CustomerRecord
    }

    @Test
    void createCustomerRecord_nullCustomer_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> customerService.createCustomerRecord(null), "Exception should be thrown when customer is null");
    }

    @Test
    void deleteCustomer_validId_deletesCustomer() {
        String id = randomUUID().toString();

        CustomerRecord record = new CustomerRecord();
        record.setId(id);
        record.setFirstName(names().first().get());
        record.setLastName(names().last().get());
        record.setAddress(addresses().get());
        record.setPhoneNumber("1-555-555-5555");
        record.setEmailAddress(emails().get());

        when(customerRepository.findById(id)).thenReturn(Optional.of(record));
        doNothing().when(customerRepository).delete(record);

        customerService.deleteCustomer(id);

        verify(customerRepository).delete(record); //verify delete was called with customer record
    }
}
