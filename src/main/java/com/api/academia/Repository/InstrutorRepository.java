package com.api.academia.Repository;

import com.api.academia.Model.InstrutorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrutorRepository extends JpaRepository<InstrutorModel,Long> {
}
