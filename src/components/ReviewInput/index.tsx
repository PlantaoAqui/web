import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import StarRating from '../StarRating';
import './styles.css';

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

function ReviewInput (props: ReviewInputProps) {
    return (
        <div className="review-input">
            <div className="review">
                <div className="descricao">
                    <h3>{props.titulo}</h3>
                    <p>{props.descricao}</p>
                </div>
                <StarRating
                    name={props.name}
                    value={props.nota}
                    handleChange={props.handleChange}
                    precision={1} size="large"
                />
            </div>
            {props.pergunta && (
                <div className="pergunta">
                    <p>{props.textoPergunta}</p>
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
