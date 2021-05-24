import React, { ReactText } from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './styles.css';
import { ListSubheader } from '@material-ui/core';

interface SelectInputProps<T> {
    name?: string;
    value: string;
    default: string;
    error?: boolean;
    group?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleBlur?: (e: React.FocusEvent<unknown>) => void;
    items: T[] | null;
    keyMap: (record: T) => ReactText;
    valueMap: (record: T) => string;
    elementsGroupMap?: (record: T) => Array<{ id: number, value: string }>;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        formControl: {
            width: '100%'
        },
        root: {
            height: '4rem',
            color: 'var(--cor-texto-claro)',
            background: 'transparent',
            border: '1px solid var(--cor-borda-campos)',
            borderRadius: '0.8rem',
            font: '400 1.7rem SFProText',
            padding: '0'
        },
        group: {
            font: '500 1.2rem SFProText',
            color: 'var(--cor-texto-escuro)',
            padding: '.8rem',
            background: theme.palette.background.paper
        },
        itemGroup: {
            marginLeft: '1.2rem'
        },
        selected: {
            color: 'var(--cor-texto-escuro)'
        },
        erro: {
            color: 'var(--cor-vermelha-warning)',
            border: '1px solid var(--cor-vermelha-warning)'
        }
    })
);

function SelectInput<T> (props: SelectInputProps<T>) {
    const classes = useStyles();
    return (
        <div className="select-input-styled">
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    className={`${classes.root} ${props.value && classes.selected} ${props.error && classes.erro}`}
                    displayEmpty
                    name={props.name}
                    value={props.value}
                    onChange={(e) => props.handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                    onBlur={props.handleBlur && props.handleBlur}
                >
                    <MenuItem disabled value=""><p>{props.default}</p></MenuItem>
                    {props.items && props.items.length > 0 && (props.group
                        ? (
                            props.items.map(group => {
                                return (
                                    [
                                        <ListSubheader className={classes.group}
                                            key={props.keyMap(group)}
                                        >
                                            {props.valueMap(group)}
                                        </ListSubheader>,
                                        props.elementsGroupMap &&
                                        props.elementsGroupMap(group).map(item => {
                                            return (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.value}
                                                    classes={{
                                                        root: classes.itemGroup,
                                                        selected: classes.selected
                                                    }}
                                                >
                                                    {item.value}
                                                </MenuItem>
                                            );
                                        })
                                    ]
                                );
                            })
                        )
                        : (
                            props.items.map(record => {
                                return (
                                    <MenuItem
                                        key={props.keyMap(record)}
                                        value={props.valueMap(record)}
                                        classes={{ selected: classes.selected }}
                                    >
                                        {props.valueMap(record)}
                                    </MenuItem>
                                );
                            })
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectInput;
