package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.CustomerCreateRequest;
import com.kenzie.appserver.controller.model.CustomerResponse;
import com.kenzie.appserver.service.CustomerService;
import com.kenzie.appserver.service.model.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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

    @PostMapping
    public ResponseEntity<CustomerResponse> addNewCustomer(@RequestBody CustomerCreateRequest customerCreateRequest){
        Customer customer = new Customer(customerCreateRequest);
        customerService.addNewCustomer(customer);

        CustomerResponse customerResponse = new CustomerResponse(customer);

        return ResponseEntity.created(URI.create("/customer/"+ customerResponse.getId())).body(customerResponse);
    }
}

