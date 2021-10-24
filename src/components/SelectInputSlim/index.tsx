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

const useStyles = makeStyles(theme =>
    createStyles({
        fullWidth: {
            width: '100%'
        },
        select: {
            outline: 'none',
            background: 'transparent',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.body1.fontWeight,
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.text.secondary,
            cursor: 'pointer',
            border: 'none'
        }
    })
);

function SelectInputSlim<T>(props: SelectInputSlimProps<T>) {
    const classes = useStyles();
    return (
        <select
            className={`${classes.select} ${props.fullwidth && classes.fullWidth}`}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.value}
        >
            {props.placeholder && <option disabled value="">{props.placeholder}</option>}
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
