import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TipoPlantao } from '..';

interface FiltroProps {
    tipo: TipoPlantao;
    expanded: boolean;
    resultados: number;
    handleChange: (n: number) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            marginBottom: '1.3rem',
            padding: '0.7rem 1.3rem',
            background: 'var(--cor-fundo-card)',
            border: '1px solid var(--cor-fundo-card)',
            borderRadius: '8px',
            transition: '0.6s'
        },
        filtro: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            cursor: 'pointer',
            '& img': {
                height: '4.2rem',
                width: 'auto',
                marginRight: '1rem'
            }
        },
        nomeFiltro: {
            color: 'var(--cor-texto-escuro)',
            font: '400 1.2rem SFProText'
        },
        resultados: {
            color: 'var(--cor-texto-claro)',
            font: '400 1.2rem SFProText',
            marginTop: '.4rem'
        },
        rootDetails: {
            padding: '1.2rem 0'
        },
        detalhes: {
            width: '100%',
            borderTop: '1px solid var(--cor-borda-campos)',
            '& p': {
                font: '400 1.6rem SFProText',
                color: 'var(--cor-texto-escuro)'
            },
            '& p:last-child': {
                color: 'var(--cor-texto-claro)'
            },
            '& > p': {
                margin: '1.2rem 0',
                color: 'var(--cor-texto-claro)'
            }
        },
        subOpcao: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginTop: '.3rem',
            cursor: 'pointer'
        }
    })
);

function Filtro ({ tipo, expanded, resultados, handleChange }: FiltroProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Accordion expanded={expanded} onChange={() => handleChange(1)}>
                <AccordionSummary>
                    <div className={classes.filtro}>
                        <img src={tipo.icone} alt={tipo.nome}/>
                        <div>
                            <p className={classes.nomeFiltro}>{tipo.nome}</p>
                            <p className={classes.resultados}>{resultados} plantões encontrados</p>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.rootDetails}>
                    <div className={classes.detalhes}>
                        <p>Subcategorias</p>
                        {tipo.subcategorias.map(sub => {
                            return (
                                <div key={sub.id} className={classes.subOpcao}>
                                    <p>{sub.nome}</p>
                                    <p>12</p>
                                </div>
                            );
                        })}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Filtro;
