package com.kenzie.appserver.controller.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenzie.appserver.repositories.model.TicketStatus;
import com.kenzie.appserver.service.model.User;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TicketUpdateRequest {
    @JsonProperty("status")
    private TicketStatus ticketStatus;
    @JsonProperty("description")
    private String ticketDescription;
    @JsonProperty("finished")
    private ZonedDateTime finishedAt;
    @JsonProperty("users")
    private List<String> users;


//    public void deserializeUsers(String[] user) {
//        UserListConverter ulc = new UserListConverter();
//        ArrayList aList = new ArrayList<>();
//        for(String u: user) {
//            aList.add(u);
//        }
//        List<User> userList = ulc.unconvert(Arrays.toString(user));
//        this.users =  userList;
//    }

    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }

    public void setTicketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    public String getTicketDescription() {
        return ticketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public ZonedDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(ZonedDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
