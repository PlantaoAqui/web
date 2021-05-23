import React, { ReactText } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface SelectInputSlimProps<T> {
    value: string;
    placeholder?: string;
    defaultValue?: string;
    fullwidth?: boolean;
    handleChange: (e: React.ChangeEvent<unknown>) => void;
    handleBlur?: (e: React.FocusEvent<unknown>) => void;
    items: T[] | null;
    keyMap: (record: T) => ReactText;
    valueMap: (record: T) => string;
}

const useStyles = makeStyles(() =>
    createStyles({
        fullWidth: {
            width: '100%'
        },
        select: {
            outline: 'none',
            background: 'transparent',
            color: 'var(--cor-texto-escuro)',
            font: '400 1.2rem SFProText',
            cursor: 'pointer',
            border: 'none',
            '&:after': {
                color: 'red'
            }
        }
    })
);

function SelectInputSlim<T> (props: SelectInputSlimProps<T>) {
    const classes = useStyles();
    return (
        <select
            className={`${classes.select} ${props.fullwidth && classes.fullWidth}`}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            defaultValue={props.defaultValue}
        >
            {props.placeholder && <option disabled selected value="">{props.placeholder}</option>}
            {props.items && props.items.length > 0 && props.items.map(record => {
                return (
                    <option
                        key={props.keyMap(record)}
                        value={props.valueMap(record)}
                    >
                        {props.valueMap(record)}
                    </option>
                );
            })}
        </select>
    );
}

export default SelectInputSlim;
