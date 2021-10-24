import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '../../../components/Button';
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../components/TextInput';

interface FormUsuarioProps {
    values: {
        nome: string,
        sobrenome: string,
        email: string,
        senha: string,
        repetirSenha: string,
        telefone: string
    },
    errors?: {
        nome?: string,
        sobrenome?: string,
        email?: string,
        senha?: string,
        repetirSenha?: string,
        telefone?: string
    },
    touched?: {
        nome?: boolean,
        sobrenome?: boolean,
        email?: boolean,
        senha?: boolean,
        repetirSenha?: boolean,
        telefone?: boolean
    },
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur: (e: React.FocusEvent<unknown>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetCidade?: (reset: boolean) => void;
    setFotoDocumento?: (url: string) => void;
    setArquivoDocumento?: (arquivo: File) => void;
}

const useStyles = makeStyles(theme =>
    createStyles({
        campos: {
            marginTop: '2rem'
        },
        erroInscricao: {
            color: theme.palette.error.main
        }
    })
);

function FormUsuario(props: FormUsuarioProps) {
    const classes = useStyles();
    const [temErro, setTemErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    useEffect(() => {
        setTemErro(
            (!!props.errors?.nome && !!props.touched?.nome) ||
            (!!props.errors?.sobrenome && !!props.touched?.sobrenome) ||
            (!!props.errors?.email && !!props.touched?.email) ||
            (!!props.errors?.senha && !!props.touched?.senha) ||
            (!!props.errors?.repetirSenha && !!props.touched?.repetirSenha) ||
            (!!props.errors?.telefone && !!props.touched?.telefone));
        setMensagemErro(
            (props.touched?.nome && props.errors?.nome) ||
            (props.touched?.sobrenome && props.errors?.sobrenome) ||
            (props.touched?.email && props.errors?.email) ||
            (props.touched?.senha && props.errors?.senha) ||
            (props.touched?.repetirSenha && props.errors?.repetirSenha) ||
            (props.touched?.telefone && props.errors?.telefone) || '');
    }, [props.errors, props.touched]);

    return (
        <>
            <Typography gutterBottom
                variant="h4" color="textPrimary"
            >
                Seja bem-vindo!
            </Typography>
            <Typography gutterBottom
                variant="body1" color="textSecondary"
            >
                Forneça alguns dados para criar a sua conta.
            </Typography>
            <form className={classes.campos} onSubmit={props.handleSubmit}>
                {temErro && (
                    <Typography gutterBottom className={classes.erroInscricao}
                        variant="body1" color="textSecondary"
                    >
                        {mensagemErro}
                    </Typography>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextInput
                            type="text"
                            name="usuario.nome"
                            placeholder="Nome"
                            value={props.values.nome}
                            error={!!props.errors?.nome && !!props.touched?.nome}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextInput
                            type="text"
                            name="usuario.sobrenome"
                            placeholder="Sobrenome"
                            value={props.values.sobrenome}
                            error={!!props.errors?.sobrenome && !!props.touched?.sobrenome}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextInput
                            type="email"
                            name="usuario.email"
                            placeholder="Email"
                            value={props.values.email}
                            error={!!props.errors?.email && !!props.touched?.email}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            type="text"
                            name="usuario.telefone"
                            placeholder="Telefone"
                            value={props.values.telefone}
                            error={!!props.errors?.telefone && !!props.touched?.telefone}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput
                            type="password"
                            name="usuario.senha"
                            placeholder="Senha"
                            value={props.values.senha}
                            error={!!props.errors?.senha && !!props.touched?.senha}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput
                            type="password"
                            name="usuario.repetirSenha"
                            placeholder="Repita a senha"
                            value={props.values.repetirSenha}
                            error={!!props.errors?.repetirSenha && !!props.touched?.repetirSenha}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                            gutterBottom
                        />
                    </Grid>
                </Grid>
                <Button
                    background='#A1E09E'
                    type="submit"
                    texto="Quero me cadastrar"
                    textTransform="none"
                />
            </form>
        </>
    );
}

export default FormUsuario;
