import { Avatar } from '@material-ui/core';
import React from 'react';
import './styles.css';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";

function ModalInfoHospital () {
    return (
        <div className="modalinfohospital">
            <div className="informacoes">
                <div className="detalhes">
                    <div className="nome">
                        <p className="secao">Hospital Guaianazes</p>
                        <img src={iconeDptoEmergencia} alt="Hospital"/>
                    </div>
                    <div className="endereco">
                        <p className="secao">Endereço</p>
                        <p className="descricao">Av. Josá Marinho, 453</p>
                    </div>
                    <div className="cnpj">
                        <div className="secao">CNPJ</div>
                        <div className="descricao">112029002-02</div>
                    </div>
                    <div className="administrador">
                        <div className="secao">Administrador do Plantão</div>
                        <div className="descricao">Carlos Alberto Prado</div>
                    </div>
                    <div className="acreditacoes">
                        <div className="secao">Acreditações</div>
                        <div className="icones">
                            <div className="icone"></div>
                            <div className="icone"></div>
                            <div className="icone"></div>
                        </div>
                    </div>
                    <div className="tiposplantao">
                        <div className="secao">Tipos de Plantão</div>
                        <div className="icones">
                            <img src={iconeDptoEmergencia} alt="Departamento de emergência"/>
                            <img src={iconePacientesInternados} alt="Pacientes internados"/>
                            <img src={iconeTransporteInterhospitalar} alt="Transporte interhospitalar"/>
                        </div>
                    </div>
                    <div className="dadosavaliados">
                        <div className="mediasalarial">
                            <div className="secao">Média Salarial</div>
                            <div className="descricao">R$ 1245,60 / 12H</div>
                        </div>
                        <div className="avaliacao">
                            <div className="secao">Avaliação</div>
                            <div className="nota">4.63/5</div>
                        </div>
                    </div>
                </div>
                <div className="sobre">
                    <div className="sumario">Informacoes sobre a instituição</div>
                    <div className="item">
                        <div className="rotulo">Infraestrutura</div>
                        <div className="avaliacao">Boa</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Nível de Complexidade</div>
                        <div className="avaliacao">Médio</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">UTI</div>
                        <div className="avaliacao">Sim</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Tipo de sistema</div>
                        <div className="avaliacao">Digital</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Nº Médicos/ Escala</div>
                        <div className="avaliacao">10</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Equipe</div>
                        <div className="avaliacao">Boa</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Remoção</div>
                        <div className="avaliacao">Não</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Pagamento em dia</div>
                        <div className="avaliacao">Sim</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Acesso</div>
                        <div className="avaliacao">Fácil</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Segurança</div>
                        <div className="avaliacao">Média</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Infraestrutura</div>
                        <div className="avaliacao">Ótima</div>
                    </div>
                </div>
                <div className="sobre">
                    <div className="sumario">Informacoes sobre a instituição</div>
                    <div className="item">
                        <div className="rotulo">Infraestrutura</div>
                        <div className="avaliacao">Boa</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Nível de Complexidade</div>
                        <div className="avaliacao">Médio</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">UTI</div>
                        <div className="avaliacao">Sim</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Tipo de sistema</div>
                        <div className="avaliacao">Digital</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Nº Médicos/ Escala</div>
                        <div className="avaliacao">10</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Equipe</div>
                        <div className="avaliacao">Boa</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Remoção</div>
                        <div className="avaliacao">Não</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Pagamento em dia</div>
                        <div className="avaliacao">Sim</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Acesso</div>
                        <div className="avaliacao">Fácil</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Segurança</div>
                        <div className="avaliacao">Média</div>
                    </div>
                    <div className="item">
                        <div className="rotulo">Infraestrutura</div>
                        <div className="avaliacao">Ótima</div>
                    </div>
                </div>
            </div>
            <div className="secaocomentarios">
                <div className="sumario">
                    <h1>Comentários</h1>
                    <p>23 comentários</p>
                </div>
                <div className="comentarios">
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem 
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo 
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati 
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem 
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo 
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati 
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem 
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo 
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati 
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem 
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo 
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati 
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem 
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo 
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati 
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                    <div className="comentario">
                        <div className="sumario">
                            <div className="pessoa">
                                <Avatar />
                                <p className="nomepessoa">Paulo Siqueira Gusmão</p>
                            </div>
                            <p className="datacomentarios">2 de Novembro</p>
                        </div>
                        <div className="textocomentario">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum rem 
                            doloribus omnis. Recusandae exercitationem ullam vero soluta explicabo 
                            quia reprehenderit a, accusamus deserunt. Tempora commodi obcaecati 
                            consequatur sit, odit eligendi?
                        </div>
                        <div className="numrespostas">
                            8 respostas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalInfoHospital;