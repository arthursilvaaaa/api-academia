package com.api.academia.Repository;

import com.api.academia.Model.MatriculaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatriculaRepository extends JpaRepository<MatriculaModel,Long> {
}
