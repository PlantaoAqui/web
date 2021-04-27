import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactText } from 'react';
import './styles.css';

interface SelectInputProps<T> {
    name?: string;
    value: string;
    default: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    items: T[] | null;
    keyMap: (record: T) => ReactText;
    valueMap: (record: T) => string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
        width: '100%'
    },
    root: {
        height: '4rem',
        color: "var(--cor-texto-claro)",
        background: 'transparent',
        border: '1px solid var(--cor-borda-campos)',
        borderRadius: '0.8rem',
        font: '400 1.7rem SFProText',
        padding: '0'
    },
    selected: {
        color: "var(--cor-texto-escuro)"
    }
  }),
);

function SelectInput<T> (props: SelectInputProps<T>) {
    const classes = useStyles();
    return (
        <div className="select-input-styled">
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    className={props.value ? `${classes.root} ${classes.selected}` : classes.root}
                    displayEmpty
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                >
                    <MenuItem disabled value=""><p>{props.default}</p></MenuItem>
                    {props.items && props.items.map(record => {
                        return(
                            <MenuItem
                                key={props.keyMap(record)}
                                value={props.valueMap(record)}
                                classes={{ selected: classes.selected }}
                            >
                                {props.valueMap(record)}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectInput;
