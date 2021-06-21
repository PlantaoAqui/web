import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TipoPlantao } from '..';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconeCheckBoxChecked from '../../../assets/images/icones/checkboxChecked.svg';
import IconeCheckBox from '../../../assets/images/icones/checkbox.svg';
import Typography from '@material-ui/core/Typography';
import useSearch from '../../../hooks/use-search';

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
            padding: '1.2rem 0 0 0'
        },
        detalhes: {
            width: '100%',
            borderTop: '1px solid var(--cor-borda-campos)',
            paddingTop: '0.6rem'
        },
        subOpcao: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            cursor: 'pointer'
        },
        labelCheckbox: {
            flex: 1
        },
        iconeCheckbox: {
            width: '1.6rem',
            height: 'auto'
        },
        inputCheckbox: {
            padding: '4px'
        }
    })
);

function Filtro ({ tipo, expanded, resultados, handleChange }: FiltroProps) {
    const classes = useStyles();
    const search = useSearch();

    function handleChangeCheckbox (sub: number) {
        if (search.dados.subcategoria.includes(sub)) {
            search.setDados.setSubcategoria(search.dados.subcategoria.filter((item) => {
                return item !== sub;
            }));
        } else {
            search.setDados.setSubcategoria([sub, ...search.dados.subcategoria]);
        }
    }

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
                        <Typography gutterBottom
                            variant="h5" color="textSecondary"
                        >
                            Subcategorias
                        </Typography>
                        {tipo.subcategorias.map(sub => {
                            return (
                                <div key={sub.id} className={classes.subOpcao}
                                    onClick={() => handleChangeCheckbox(sub.id)}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                icon={
                                                    <img src={IconeCheckBox}
                                                        className={classes.iconeCheckbox}
                                                    />
                                                }
                                                checkedIcon={
                                                    <img src={IconeCheckBoxChecked}
                                                        className={classes.iconeCheckbox}
                                                    />
                                                }
                                                name={sub.nome}
                                                color="primary"
                                                checked={search.dados.subcategoria.includes(sub.id)}
                                                onChange={() => handleChangeCheckbox(sub.id)}
                                                classes={{
                                                    root: classes.inputCheckbox
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                variant="h5"
                                                color="textPrimary"
                                            >
                                                {sub.nome}
                                            </Typography>
                                        }
                                        style={{ margin: 0 }}
                                        classes={{
                                            label: classes.labelCheckbox
                                        }}
                                    />
                                    <div
                                        style={{
                                            margin: 'auto 0 auto 1.2rem'
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                        >
                                            12
                                        </Typography>
                                    </div>
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
