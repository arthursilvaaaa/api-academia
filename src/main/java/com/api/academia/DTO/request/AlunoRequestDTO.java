package com.api.academia.DTO.request;

import jakarta.validation.constraints.NotBlank;

public record AlunoRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,
        @NotBlank(message = "Data de nascimento é obrigatória")
        String dataNascimento
) {
}
