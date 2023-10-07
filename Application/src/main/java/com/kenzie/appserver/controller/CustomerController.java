package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.CustomerCreateRequest;
import com.kenzie.appserver.controller.model.CustomerResponse;
import com.kenzie.appserver.controller.model.CustomerUpdateRequest;
import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.service.CustomerService;
import com.kenzie.appserver.service.model.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private CustomerService customerService;

    CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> addNewCustomer(@RequestBody CustomerCreateRequest customerCreateRequest){
        try {
            Customer customer = new Customer(customerCreateRequest);
            customerService.addNewCustomer(customer);

            CustomerResponse customerResponse = new CustomerResponse(customer);

            return ResponseEntity.created(URI.create("/customer/" + customerResponse.getId())).body(customerResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable("id") String id) {
        try {
            Customer customer = customerService.findById(id);
            CustomerResponse customerResponse = new CustomerResponse(customer);
            return ResponseEntity.ok(customerResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        try {
            List<Customer> customers = customerService.findAll();
            if (customers.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<CustomerResponse> responses = customers
                    .stream()
                    .map(CustomerResponse::new).collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable("id")String customerId, @RequestBody CustomerUpdateRequest customerUpdateRequest) {
        try {
            Customer customer = new Customer(customerUpdateRequest);
            Customer updatedCustomer = customerService.updateCustomer(customerId, customer);
            CustomerResponse customerResponse = new CustomerResponse(updatedCustomer);
            return ResponseEntity.ok(customerResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id")String customerId) {
        try {
            customerService.deleteCustomer(customerId);
            return ResponseEntity.ok("Customer deleted successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

