package com.api.academia.Model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MatriculaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String dataMatricula;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private AlunoModel alunoModel;

    @ManyToOne
    @JoinColumn(name = "aula_id")
    private AulaModel aulaModel;
}
