import React, { ReactElement, ReactNode } from 'react';
import Rating from '@material-ui/lab/Rating';
import './styles.css';
import { withStyles } from '@material-ui/core/styles';
import iconeEstrela from "../../assets/images/icones/reviewStar.svg"
import {ReactComponent as iconeEstrelaCheio} from "../../assets/images/icones/reviewStarFull.svg"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconeEstrelaCheia from '../../assets/images/icones/iconeEstrelaCheia';
import IconeEstrela from '../../assets/images/icones/iconeEstrela';

interface StarRatingProps {
    name?: string;
    value: number;
    setValue?: (value: number) => void;
    handleChange?: (event: React.ChangeEvent<{}>, value: number | null) => void;
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
