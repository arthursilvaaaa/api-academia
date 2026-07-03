package com.api.academia.Repository;

import com.api.academia.Model.AulaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AulaRepository extends JpaRepository<AulaModel,Long> {
}
