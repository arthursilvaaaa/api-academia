package com.api.academia.Mapper;

import com.api.academia.DTO.request.AulaRequestDTO;
import com.api.academia.DTO.response.AulaResponseDTO;
import com.api.academia.Model.AulaModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AulaMapper {
    @Mapping(target = "instrutorModel", ignore = true)
    AulaModel toModel(AulaRequestDTO dto);
    @Mapping(target = "instrutorId", source = "instrutorModel.id")
    @Mapping(target = "instrutorNome", source = "instrutorModel.nome")
    AulaResponseDTO toResponse(AulaModel aulaModel);
}
