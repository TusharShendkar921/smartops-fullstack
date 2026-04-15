package com.smartops.backend.controller;

import com.smartops.backend.entity.ActivityLog;
import com.smartops.backend.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class ActivityLogController {

    private final ActivityLogRepository activityLogRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAll();
    }
}