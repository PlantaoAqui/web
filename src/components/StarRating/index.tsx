import React from 'react';
import Rating from '@material-ui/lab/Rating';
import './styles.css';
import IconeEstrelaCheia from '../../assets/images/icones/iconeEstrelaCheia';
import IconeEstrela from '../../assets/images/icones/iconeEstrela';

interface StarRatingProps {
    name?: string;
    value: number;
    setValue?: (value: number) => void;
    handleChange?: (event: React.ChangeEvent<unknown>, value: number | null) => void;
    readonly?: boolean;
    precision?: number;
    size?: 'large' | 'small';
}

function StarRating (props: StarRatingProps) {
    return (
        <div className="estrelas">
            <Rating
                name={props.name}
                value={props.value}
                readOnly={props.readonly}
                precision={props.precision || 0.1}
                icon={<IconeEstrelaCheia size={props.size}/>}
                emptyIcon={<IconeEstrela size={props.size}/>}
                // onChange={(_, newValue) => props.setValue && props.setValue(newValue || 0)}
                onChange={props.handleChange}
            />
        </div>
    );
}

export default StarRating;
