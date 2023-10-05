package com.kenzie.appserver.controller;

import com.amazonaws.Response;
import com.kenzie.appserver.controller.model.CustomerCreateRequest;
import com.kenzie.appserver.controller.model.CustomerResponse;
import com.kenzie.appserver.controller.model.CustomerUpdateRequest;
import com.kenzie.appserver.service.CustomerService;
import com.kenzie.appserver.service.model.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private CustomerService customerService;

    CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> get(@PathVariable("id") String id) {
        Customer customer = customerService.findByID(id);
        if (customer == null) {
            return  ResponseEntity.notFound().build();
        }
        CustomerResponse customerResponse = new CustomerResponse(customer);
        return ResponseEntity.ok(customerResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        List<Customer> customers = new ArrayList<>();

        List<CustomerResponse> responses = customers.stream().map(CustomerResponse::new).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> addNewCustomer(@RequestBody CustomerCreateRequest customerCreateRequest){
        Customer customer = new Customer(customerCreateRequest);
        customerService.addNewCustomer(customer);

        CustomerResponse customerResponse = new CustomerResponse(customer);

        return ResponseEntity.created(URI.create("/customer/"+ customerResponse.getId())).body(customerResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("id")String customerId, @RequestBody CustomerUpdateRequest customerUpdateRequest) {
        Customer updatedCustomer = customerService.findByID(customerId);
        updatedCustomer.setFirstName(customerUpdateRequest.getFirstName());
        updatedCustomer.setLastName(customerUpdateRequest.getLastName());
        updatedCustomer.setAddress(customerUpdateRequest.getAddress());
        updatedCustomer.setEmailAddress(customerUpdateRequest.getEmailAddress());
        updatedCustomer.setPhoneNumber(customerUpdateRequest.getPhoneNumber());
        customerService.updateCustomer(updatedCustomer);
        CustomerResponse customerResponse = new CustomerResponse(updatedCustomer);
        return ResponseEntity.ok(customerResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable("id")String customerId) {
        customerService.deleteCustomer(customerId);
        return ResponseEntity.ok("Customer deleted successfully.");
    }
}

