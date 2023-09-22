package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.CustomerRepository;
import com.kenzie.appserver.repositories.model.CustomerRecord;
import com.kenzie.appserver.service.model.Customer;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer findByID(String id) {
        return customerRepository.findById(id).map(customerRecord -> {
            Customer customer = new Customer();
            customer.setId( customerRecord.getId());
            customer.setFirstName(customerRecord.getFirstName());
            customer.setLastName(customerRecord.getLastName());
            customer.setAddress(customerRecord.getAddress());
            customer.setEmailAddress(customerRecord.getEmailAddress());
            customer.setPhoneNumber(customerRecord.getPhoneNumber());
            return customer;
        }).orElse(null);
    }


    public Customer addNewCustomer(Customer customer) {
        CustomerRecord customerRecord = createCustomerRecord(customer);
        customerRepository.save(customerRecord);
        return customer;
    }

    public CustomerRecord createCustomerRecord(Customer customer) {
        CustomerRecord customerRecord = new CustomerRecord();
        customerRecord.setId(customer.getId());
        customerRecord.setLastName(customer.getLastName());
        customerRecord.setFirstName(customer.getFirstName());
        customerRecord.setAddress(customer.getAddress());
        customerRecord.setEmailAddress(customer.getEmailAddress());
        customerRecord.setPhoneNumber(customer.getPhoneNumber());
        return customerRecord;
    }



}

