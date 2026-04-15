package com.smartops.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {

    private String name;
    private String description;
    private String status;
    private LocalDate deadline;
    private Long teamId;
}