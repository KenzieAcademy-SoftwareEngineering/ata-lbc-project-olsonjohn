package com.kenzie.appserver.repositories.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.Objects;

@DynamoDBTable(tableName = "Customers")
public class CustomerRecord {
    private String id;
    private String firstName;
    private String lastName;
    private String address;
    private String emailAddress;
    private String phoneNumber;

    @DynamoDBHashKey(attributeName = "id")
    public String getId() {
        return id;
    }
    @DynamoDBAttribute(attributeName = "firstName")
    public String getFirstName() {
        return firstName;
    }
    @DynamoDBAttribute(attributeName = "lastName")
    public String getLastName() {
        return lastName;
    }
    @DynamoDBAttribute(attributeName = "address")
    public String getAddress() {
        return address;
    }
    @DynamoDBAttribute(attributeName = "emailAddress")
    public String getEmailAddress() {
        return emailAddress;
    }
    @DynamoDBAttribute(attributeName = "phoneNumber")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustomerRecord)) return false;
        CustomerRecord that = (CustomerRecord) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
