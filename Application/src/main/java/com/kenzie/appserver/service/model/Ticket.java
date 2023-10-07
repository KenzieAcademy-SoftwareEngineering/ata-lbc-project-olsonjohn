package com.kenzie.appserver.service.model;

import com.kenzie.appserver.controller.model.TicketCreateRequest;
import com.kenzie.appserver.controller.model.TicketUpdateRequest;
import com.kenzie.appserver.repositories.model.TicketRecord;
import com.kenzie.appserver.repositories.model.TicketStatus;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

import static java.util.UUID.randomUUID;

public class Ticket {
    private String ticketSubject;
    private String ticketDescription;
    private ZonedDateTime createdAt;
    private ZonedDateTime finishedAt;
    private TicketStatus ticketStatus;
    private String ticketId;
    private String customerId;
    private List<String> users;

    public Ticket() {}

    public Ticket(String ticketId,
                  String customerId,
                  String ticketSubject,
                  String ticketDescription) {
        this.ticketId = ticketId;
        this.ticketSubject = ticketSubject;
        this.ticketDescription = ticketDescription;
        this.ticketStatus = TicketStatus.NEW;
        this.createdAt = ZonedDateTime.now();
        this.customerId = customerId;
    }

    public Ticket(String ticketId,
                  String ticketSubject,
                  String ticketDescription,
                  TicketStatus ticketStatus,
                  ZonedDateTime createdAt,
                  ZonedDateTime finishedAt,
                  String customerId,
                  List<String> users) {
        this.ticketId = ticketId;
        this.ticketSubject = ticketSubject;
        this.ticketDescription = ticketDescription;
        this.ticketStatus = ticketStatus;
        this.createdAt = createdAt;
        this.finishedAt = finishedAt;
        this.customerId = customerId;
        this.users = users;
    }

    public Ticket(TicketRecord ticketRecord) {
        this.ticketId = ticketRecord.getTicketId();
        this.ticketSubject = ticketRecord.getTicketSubject();
        this.ticketDescription = ticketRecord.getTicketDescription();
        this.ticketStatus = ticketRecord.getTicketStatus();
        this.createdAt = ticketRecord.getCreatedAt();
        this.finishedAt = ticketRecord.getFinishedAt();
        this.customerId = ticketRecord.getCustomerId();
        this.users = ticketRecord.getUsers();
    }

    public Ticket(TicketCreateRequest ticketCreateRequest) {
        this.ticketId = randomUUID().toString();
        this.ticketSubject = ticketCreateRequest.getTicketSubject();
        this.ticketDescription = ticketCreateRequest.getTicketDescription();
        this.createdAt = ZonedDateTime.now();
        this.customerId = ticketCreateRequest.getCustomerId();
    }

    public Ticket(TicketUpdateRequest ticketUpdateRequest) {
        this.ticketDescription = ticketUpdateRequest.getTicketDescription();
        this.users = ticketUpdateRequest.getUsers();
        this.ticketStatus = ticketUpdateRequest.getTicketStatus();
        this.finishedAt = ticketUpdateRequest.getFinishedAt();
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getCustomerId() {
        return this.customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getTicketSubject() {
        return ticketSubject;
    }

    public void setTicketSubject(String ticketSubject) {
        this.ticketSubject = ticketSubject;
    }

    public String getTicketDescription() {
        return ticketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(ZonedDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }

    public void setTicketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return Objects.equals(ticketSubject, ticket.ticketSubject)
                && Objects.equals(ticketDescription, ticket.ticketDescription)
                && Objects.equals(createdAt, ticket.createdAt)
                && Objects.equals(finishedAt, ticket.finishedAt)
                && ticketStatus == ticket.ticketStatus
                && Objects.equals(ticketId, ticket.ticketId)
                && Objects.equals(customerId, ticket.customerId)
                && Objects.equals(users, ticket.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ticketSubject,
                ticketDescription,
                createdAt,
                finishedAt,
                ticketStatus,
                ticketId,
                customerId,
                users);
    }
}
