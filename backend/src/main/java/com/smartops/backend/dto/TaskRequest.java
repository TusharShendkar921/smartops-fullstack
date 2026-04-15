package com.smartops.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequest {

    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDate deadline;
    private Long projectId;
    private Long assignedToUserId;
}