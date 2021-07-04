import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import StarRating from '../StarRating';
import './styles.css';
import Typography from '@material-ui/core/Typography';

interface ReviewInputProps {
    name: string;
    titulo: string;
    descricao: string;
    nota: number;
    handleChange?: (event: React.ChangeEvent<unknown>, value: number | null) => void;
    pergunta?: boolean;
    textoPergunta?: string;
    valorPergunta?: boolean;
    handleChangePergunta?: (event: React.ChangeEvent<unknown>, value: string) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            outline: 'none',
            background: 'transparent'
        },
        review: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        descricao: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around'
        }
    })
);

function ReviewInput (props: ReviewInputProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.review}>
                <div className={classes.descricao}>
                    <Typography color="textPrimary"
                        variant="h6"
                    >
                        {props.titulo}
                    </Typography>
                    <Typography color="textPrimary"
                        variant="caption"
                    >
                        {props.descricao}
                    </Typography>
                </div>
                <StarRating
                    name={props.name}
                    value={props.nota}
                    handleChange={props.handleChange}
                    precision={1} size="large"
                />
            </div>
            {props.pergunta && (
                <div className={classes.review}>
                    <Typography color="textPrimary"
                        variant="subtitle2"
                    >
                        {props.textoPergunta}
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            value={props.valorPergunta}
                            onChange={props.handleChangePergunta}
                        >
                            <FormControlLabel value={true} control={<Radio color="primary"/>} label="Sim" />
                            <FormControlLabel value={false} control={<Radio color="primary"/>} label="Não" />
                        </RadioGroup>
                    </FormControl>
                </div>
            )}
        </div>
    );
}

export default ReviewInput;
