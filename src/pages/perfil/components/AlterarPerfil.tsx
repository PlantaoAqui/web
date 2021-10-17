import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import Button from '../../../components/Button';
import CardTitulo from '../../../components/CardTitulo';
import SelectInput from '../../../components/SelectInput';
import TextInput from '../../../components/TextInput';
import api from '../../../services/api';

interface AlterarPerfilProps {
    perfil: DadosPerfil,
    close: () => void,
    update: () => void
}

export type DadosPerfil = {
    nome: string;
    sobrenome: string,
    email: string,
    crm: string,
    municipio: {
        idMunicipio: number;
        nomeMunicipio: string;
    },
    uf: {
        idUF: number;
        nomeUF: string;
    },
    idGrauDeFormacao: number,
    grauDeFormacao: string,
    instituicaoDeEnsino: string,
    dataDeNascimento: string
};

function AlterarPerfil ({ perfil, close, update }: AlterarPerfilProps) {
    const [uf, setUF] = useState(perfil.uf.nomeUF);
    const [municipio, setMunicipio] = useState(perfil.municipio.nomeMunicipio);
    const [grauDeFormacao, setGrauDeFormacao] = useState(perfil.grauDeFormacao);
    const [statusList, setStatusList] = useState([{ id: 0, nome: perfil.grauDeFormacao }]);
    const [estados, setEstados] = useState([{ id: 0, nome: perfil.uf.nomeUF }]);
    const [cidades, setCidades] = useState([{ id: 0, nome: perfil.municipio.nomeMunicipio }]);

    const submeterAlteracoes = useAsyncCallback(async () => {
        try {
            await api.patch('/usuarios', formikPerfil.values);
            update();
        } catch (error) {
            // Criar snackbar
            console.log(error);
        }
    });

    const formikPerfil = useFormik({
        initialValues: {
            usuario: {
                nome: perfil.nome,
                sobrenome: perfil.sobrenome,
                email: perfil.email
            },
            informacoesUsuario: {
                crm: perfil.crm,
                status: perfil.idGrauDeFormacao,
                estado: perfil.uf.idUF,
                cidade: perfil.municipio.idMunicipio,
                instituicaoDeEnsino: perfil.instituicaoDeEnsino,
                dataDeNascimento: perfil.dataDeNascimento.split('T')[0],
                telefone: '(11) 98374-8384'
            }
        },
        onSubmit: () => submeterAlteracoes.execute()
    });

    async function listarEstados () {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setEstados(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function listarGrauDeFormacao () {
        try {
            const response = await api.get('/tipos', {
                params: { tipo: 'formacao' }
            });
            setStatusList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstados();
        listarGrauDeFormacao();
    }, []);

    async function listarCidades () {
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formikPerfil.values.informacoesUsuario.estado}/municipios?orderBy=nome`);
            setCidades(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarCidades();
    }, [formikPerfil.values.informacoesUsuario.estado]);

    return (
        <form onSubmit={formikPerfil.handleSubmit}>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <CardTitulo
                        titulo="Informações pessoais"
                        transparent
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Nome"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="text"
                                            name="usuario.nome"
                                            placeholder="Nome"
                                            value={formikPerfil.values.usuario.nome}
                                            error={!!formikPerfil.errors.usuario?.nome && !!formikPerfil.touched.usuario?.nome}
                                            handleChange={formikPerfil.handleChange}
                                            handleBlur={formikPerfil.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        component: 'div'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <ListItemText
                                    primary="Sobrenome"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="text"
                                            name="usuario.sobrenome"
                                            placeholder="Sobrenome"
                                            value={formikPerfil.values.usuario.sobrenome}
                                            error={!!formikPerfil.errors.usuario?.sobrenome && !!formikPerfil.touched.usuario?.sobrenome}
                                            handleChange={formikPerfil.handleChange}
                                            handleBlur={formikPerfil.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Data de nascimento"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="date"
                                            name="informacoesUsuario.dataDeNascimento"
                                            placeholder="Data de nascimento"
                                            value={formikPerfil.values.informacoesUsuario.dataDeNascimento}
                                            error={!!formikPerfil.errors.informacoesUsuario?.dataDeNascimento && !!formikPerfil.touched.informacoesUsuario?.dataDeNascimento}
                                            handleChange={formikPerfil.handleChange}
                                            handleBlur={formikPerfil.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary',
                                        component: 'div'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <ListItemText
                                    primary="Email"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="text"
                                            disabled
                                            value={formikPerfil.values.usuario.email}
                                            handleChange={formikPerfil.handleChange}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Instituição de ensino"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="text"
                                            name="informacoesUsuario.instituicaoDeEnsino"
                                            placeholder="Instituição de ensino"
                                            value={formikPerfil.values.informacoesUsuario.instituicaoDeEnsino}
                                            error={!!formikPerfil.errors.informacoesUsuario?.instituicaoDeEnsino && !!formikPerfil.touched.informacoesUsuario?.instituicaoDeEnsino}
                                            handleChange={formikPerfil.handleChange}
                                            handleBlur={formikPerfil.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Telefone"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="text"
                                            name="informacoesUsuario.telefone"
                                            placeholder="Telefone"
                                            value={formikPerfil.values.informacoesUsuario.telefone}
                                            error={!!formikPerfil.errors.informacoesUsuario?.telefone && !!formikPerfil.touched.informacoesUsuario?.telefone}
                                            handleChange={formikPerfil.handleChange}
                                            handleBlur={formikPerfil.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Grau de formação"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <SelectInput
                                            name="informacoesUsuario.status"
                                            value={grauDeFormacao}
                                            error={!!formikPerfil.errors.informacoesUsuario?.status && !!formikPerfil.touched.informacoesUsuario?.status}
                                            default="Grau de formação"
                                            handleChange={(e) => {
                                                setGrauDeFormacao(e.target.value);
                                                e.target.value = statusList?.find(stat => stat.nome === e.target.value)?.id.toString() || '';
                                                formikPerfil.handleChange(e);
                                            }}
                                            handleBlur={formikPerfil.handleBlur}
                                            items={statusList}
                                            keyMap={status => status.id}
                                            valueMap={status => status.nome}
                                        />
                                    }
                                    disableTypography
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="CRM"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <TextInput
                                            type="text"
                                            name="informacoesUsuario.crm"
                                            placeholder="CRM"
                                            value={formikPerfil.values.informacoesUsuario.crm}
                                            error={!!formikPerfil.errors.informacoesUsuario?.crm && !!formikPerfil.touched.informacoesUsuario?.crm}
                                            handleChange={formikPerfil.handleChange}
                                            handleBlur={formikPerfil.handleBlur}
                                        />
                                    }
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Estado"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <SelectInput
                                            name="informacoesUsuario.estado"
                                            default="Estado"
                                            value={uf}
                                            error={!!formikPerfil.errors.informacoesUsuario?.estado && !!formikPerfil.touched.informacoesUsuario?.estado}
                                            handleChange={(e) => {
                                                setUF(e.target.value);
                                                console.log(e.target.value);
                                                e.target.value = estados.find(estado => estado.nome === e.target.value)?.id.toString() || '';
                                                formikPerfil.handleChange(e);
                                                setMunicipio('');
                                            }}
                                            handleBlur={formikPerfil.handleBlur}
                                            items={estados}
                                            keyMap={estado => estado.id}
                                            valueMap={estado => estado.nome}
                                        />
                                    }
                                    disableTypography
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ListItemText
                                    primary="Cidade"
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textSecondary'
                                    }}
                                    secondary={
                                        <SelectInput
                                            name="informacoesUsuario.cidade"
                                            value={municipio}
                                            error={!!formikPerfil.errors.informacoesUsuario?.cidade && !!formikPerfil.touched.informacoesUsuario?.cidade}
                                            default="Cidade"
                                            handleChange={(e) => {
                                                setMunicipio(e.target.value);
                                                e.target.value = cidades.find(cidade => cidade.nome === e.target.value)?.id.toString() || '';
                                                formikPerfil.handleChange(e);
                                            }}
                                            handleBlur={formikPerfil.handleBlur}
                                            items={cidades}
                                            keyMap={cidade => cidade.id}
                                            valueMap={cidade => cidade.nome}
                                        />
                                    }
                                    disableTypography
                                    secondaryTypographyProps={{
                                        variant: 'body1',
                                        color: 'textPrimary'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardTitulo>
                </Grid>
                <Grid container spacing={3} item>
                    <Grid item xs={6}>
                        <Button
                            texto="Salvar modificaões"
                            type="submit"
                            background="#3F3F3F"
                            dark
                            textTransform="none"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            texto="Cancelar"
                            type="button"
                            onClick={() => close()}
                            variant="outlined"
                            textTransform="none"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default AlterarPerfil;
