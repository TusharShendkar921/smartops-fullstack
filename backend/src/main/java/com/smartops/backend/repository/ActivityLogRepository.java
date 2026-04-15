package com.smartops.backend.repository;

import com.smartops.backend.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}