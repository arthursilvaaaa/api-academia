package com.api.academia.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MatriculaRequestDTO (
        @NotBlank(message = "Data da matrícula é obrigatória")
        String dataMatricula,
        @NotNull(message = "Aluno é obrigatório")
        Long alunoId,
        @NotNull(message = "Aula é obrigatória")
        Long aulaId
){}
