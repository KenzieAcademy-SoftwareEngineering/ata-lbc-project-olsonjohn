package com.kenzie.appserver.repositories.model;


import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.kenzie.appserver.converter.ZonedDateTimeConverter;
import com.kenzie.appserver.service.model.User;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

@DynamoDBTable(tableName = "Tickets")
public class TicketRecord {
    private String ticketSubject;
    private String ticketDescription;
    private ZonedDateTime createdAt;
    private ZonedDateTime finishedAt;
    private TicketStatus ticketStatus;
    private String ticketId;
    private String customerId;
    private List<User> users;

//TODO: Add DynamoDB attributes for GSI with CustomerId HashKey for customer ticket history

    @DynamoDBAttribute(attributeName = "subject")
    public String getTicketSubject() {
        return ticketSubject;
    }
    @DynamoDBAttribute(attributeName = "description")
    public String getTicketDescription() {
        return ticketDescription;
    }
    @DynamoDBAttribute(attributeName = "created")
    @DynamoDBTypeConverted(converter = ZonedDateTimeConverter.class)
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    @DynamoDBAttribute(attributeName = "finished")
    @DynamoDBTypeConverted(converter = ZonedDateTimeConverter.class)
    public ZonedDateTime getFinishedAt() {
        return finishedAt;
    }
    @DynamoDBRangeKey(attributeName = "status")
    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }
    @DynamoDBHashKey(attributeName = "ticketId")
    public String getTicketId() {
        return ticketId;
    }
    @DynamoDBAttribute(attributeName = "customerId")
    public String getCustomerId() {return customerId;}
    @DynamoDBAttribute(attributeName = "users")
    public List<User> getUsers() {return users;}

    public void setTicketSubject(String ticketSubject) {
        this.ticketSubject = ticketSubject;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setFinishedAt(ZonedDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public void setTicketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public void setCustomerId(String customerId) {this.customerId = customerId;}

    public void setUsers(List<User> users) {this.users = users;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TicketRecord)) return false;
        TicketRecord that = (TicketRecord) o;
        return Objects.equals(getTicketId(), that.getTicketId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTicketId());
    }
}
