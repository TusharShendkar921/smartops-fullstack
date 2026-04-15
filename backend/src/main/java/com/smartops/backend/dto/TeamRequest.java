package com.smartops.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamRequest {

    private String name;
    private String description;
}