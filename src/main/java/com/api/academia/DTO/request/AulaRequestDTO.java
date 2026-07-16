package com.api.academia.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AulaRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,
        @NotBlank(message = "Horário é obrigatório")
        String horario,
        @NotNull(message = "Instrutor é obrigatório")
        Long instrutorId
) {}