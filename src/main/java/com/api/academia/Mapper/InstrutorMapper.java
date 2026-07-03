package com.api.academia.Mapper;

import com.api.academia.DTO.request.InstrutorRequestDTO;
import com.api.academia.DTO.response.InstrutorResponseDTO;
import com.api.academia.Model.InstrutorModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstrutorMapper {
    InstrutorModel toModel (InstrutorRequestDTO dto);
    InstrutorResponseDTO toResponse(InstrutorModel instrutorModel);
}
