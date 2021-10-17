import React, { useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './styles.css';

import { Dialog } from '@material-ui/core';
import ModalInfoPlantao from '../ModalInfoPlantao';
import { Plantao } from '../../pages/plantoes';
import Typography from '@material-ui/core/Typography';
import StarRating from '../StarRating';

export interface InterfaceCardPlantao {
    plantao: Plantao;
    blurBackground: (e: boolean) => void;
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--cor-fundo-card)',
            borderRadius: '12px',
            padding: theme.spacing(3),
            transition: '0.4s',
            cursor: 'pointer',
            border: 'none',
            '&:hover': {
                background: 'var(--cor-fundo-card-hover)'
            }
        },
        sumario: {
            width: '100%',
            height: '4.8rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            '& img': {
                height: '100%',
                width: 'auto',
                marginRight: theme.spacing(5)
            }
        },
        descricao: {
            marginTop: theme.spacing(4),
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        item: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        titulo: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
        },
        container: {
            [theme.breakpoints.down('lg')]: {
                // height: 'unset'
            }
        },
        dialogPaper: {
            backgroundColor: 'transparent',
            width: '80vw',
            maxWidth: '930px',
            minWidth: '720px',
            marginTop: '11.2rem',
            outline: '0',
            boxShadow: 'none',
            [theme.breakpoints.up('lg')]: {
                width: 'calc(58.4vw - 1.2rem)',
                margin: '11.2rem 21.6vw 0 calc(31.6vw + 1.2rem)'
            },
            [theme.breakpoints.up('xl')]: {
                margin: '11.2rem 21.6vw 0 31.6vw'
            }
        }
    })
);

function CardHospital ({ plantao, blurBackground }: InterfaceCardPlantao) {
    const classes = useStyles();
    const [nomeHospitalCard, setNomeHospitalCard] = useState(plantao.nome);
    const [modalInfoCardAberto, setModalInfoCardAberto] = useState(false);
    const refInfoCardHospital = useRef<HTMLElement>(null);

    useEffect(() => {
        if (modalInfoCardAberto) {
            const { current: descriptionElement } = refInfoCardHospital;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
        blurBackground(modalInfoCardAberto);
    }, [modalInfoCardAberto]);

    useEffect(() => {
        if (nomeHospitalCard.length > 40) {
            let nome = nomeHospitalCard;

            while (nome.length > 40) {
                nome = nome.substring(0, nome.lastIndexOf(' '));
            }
            nome = nome.concat(' ...');
            setNomeHospitalCard(nome);
        }
    }, [nomeHospitalCard]);

    return (
        <>
            <button className={classes.root} onClick={() => setModalInfoCardAberto(true)}>
                <div className={classes.sumario}>
                    <img src={plantao.icone} alt={plantao.nome}/>
                    <div>
                        <Typography
                            variant="body2" color="textPrimary"
                            align="left" className={classes.titulo}
                        >
                            {plantao.nome}
                        </Typography>
                    </div>
                </div>
                <div className={classes.descricao}>
                    <div className={classes.item}>
                        <Typography
                            variant="body1" color="textSecondary" gutterBottom
                        >
                            Nota
                        </Typography>
                        <StarRating value={plantao.nota} readonly/>
                    </div>
                    <div className={classes.item}>
                        <Typography
                            variant="body1" color="textSecondary" gutterBottom
                        >
                            Média Salarial
                        </Typography>
                        <Typography
                            variant="body1" gutterBottom
                        >
                            R$ {plantao.media_salarial}/12H
                        </Typography>
                    </div>
                </div>
            </button>
            <Dialog
                open={modalInfoCardAberto}
                onClose={() => { setModalInfoCardAberto(false); }}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                classes={{ container: classes.container }}
                PaperProps={{
                    className: classes.dialogPaper
                }}
            >
                <ModalInfoPlantao
                    plantao={plantao}
                    onClose={() => setModalInfoCardAberto(false)}
                />
            </Dialog>
        </>
    );
}

export default CardHospital;
