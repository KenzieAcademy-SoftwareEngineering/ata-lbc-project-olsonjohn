package com.kenzie.appserver.repositories.model;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.time.ZonedDateTime;
import java.util.Objects;

@DynamoDBTable(tableName = "Tickets")
public class TicketRecord {
    private String ticketSubject;
    private String ticketDescription;
    private ZonedDateTime createdAt;
    private ZonedDateTime finishedAt;
    private TicketStatus ticketStatus;
    private String id;

    @DynamoDBAttribute
    public String getTicketSubject() {
        return ticketSubject;
    }
    @DynamoDBAttribute
    public String getTicketDescription() {
        return ticketDescription;
    }

    @DynamoDBAttribute
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    @DynamoDBAttribute
    public ZonedDateTime getFinishedAt() {
        return finishedAt;
    }
    @DynamoDBAttribute
    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }
    @DynamoDBHashKey(attributeName = "id")
    public String getId() {
        return id;
    }

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

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TicketRecord)) return false;
        TicketRecord that = (TicketRecord) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
