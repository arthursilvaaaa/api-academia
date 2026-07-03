package com.api.academia.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlunoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String dataNascimento;

    @OneToMany(mappedBy = "alunoModel", cascade = CascadeType.ALL)
    private List<MatriculaModel> matriculaModel = new ArrayList<>();
}
