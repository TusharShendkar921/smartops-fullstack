package com.smartops.backend.service;

import com.smartops.backend.entity.ActivityLog;
import com.smartops.backend.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public void log(String action, String entityType, Long entityId, String description) {
        ActivityLog log = ActivityLog.builder()
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .description(description)
                .createdAt(LocalDateTime.now())
                .build();

        activityLogRepository.save(log);
    }
}