package com.kenzie.appserver.service;

import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.repositories.CustomerRepository;
import com.kenzie.appserver.repositories.model.CustomerRecord;
import com.kenzie.appserver.service.model.Customer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer findById(String customerId) throws IllegalArgumentException, NullPointerException {
        return customerRepository
                .findById(customerId)
                .map(customerRecord -> new Customer(
                        customerRecord.getId(),
                        customerRecord.getFirstName(),
                        customerRecord.getLastName(),
                        customerRecord.getAddress(),
                        customerRecord.getEmailAddress(),
                        customerRecord.getPhoneNumber()))
                .orElseThrow(() -> new ResourceNotFoundException("Customer does not exist with id: " + customerId));
    }

    public List<Customer> findAll() throws IllegalArgumentException, NullPointerException {
        List<Customer> customers = new ArrayList<>();
        customerRepository
                .findAll()
                .forEach(customer -> customers.add(new Customer(
                        customer.getId(),
                        customer.getFirstName(),
                        customer.getLastName(),
                        customer.getAddress(),
                        customer.getEmailAddress(),
                        customer.getPhoneNumber())));
        return customers;
    }

    public Customer addNewCustomer(Customer customer) throws IllegalArgumentException {
        CustomerRecord customerRecord = createCustomerRecord(customer);
        customerRepository.save(customerRecord);
        return customer;
    }

    public CustomerRecord createCustomerRecord(Customer customer) {
        if (customer != null) {
            CustomerRecord customerRecord = new CustomerRecord();
            customerRecord.setId(customer.getId());
            customerRecord.setLastName(customer.getLastName());
            customerRecord.setFirstName(customer.getFirstName());
            customerRecord.setAddress(customer.getAddress());
            customerRecord.setEmailAddress(customer.getEmailAddress());
            customerRecord.setPhoneNumber(customer.getPhoneNumber());
            return customerRecord;
        } else {
            throw new IllegalArgumentException("Input customer can not be null");
        }
    }

    public Customer updateCustomer(String customerId, Customer updateCustomer) throws IllegalArgumentException {
        CustomerRecord customerRecord = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + updateCustomer.getId()));
        customerRecord.setFirstName(updateCustomer.getFirstName());
        customerRecord.setLastName(updateCustomer.getLastName());
        customerRecord.setAddress(updateCustomer.getAddress());
        customerRecord.setEmailAddress(updateCustomer.getEmailAddress());
        customerRecord.setPhoneNumber(updateCustomer.getPhoneNumber());
        customerRepository.save(customerRecord);
        return new Customer(customerRecord);
    }

    public void deleteCustomer(String customerId) throws IllegalArgumentException {
        CustomerRecord customerRecord = customerRepository
                .findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer does not exist with id: " + customerId));
        customerRepository.delete(customerRecord);
    }
}

