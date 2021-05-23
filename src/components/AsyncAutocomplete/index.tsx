import React, { useState, ReactNode } from 'react';

import { useDebounce } from 'use-debounce';
import { useAsync } from 'react-async-hook';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface AsyncAutocompleteProps<T> {
    getOptions: (inputValue: string) => Promise<T[]>;
    value: T;
    onChange: (event: React.ChangeEvent<unknown>, newValue: T | null) => void;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    getOptionLabel?: (option: T) => string;
    getOptionSelected?: (option: T, value: T) => boolean;
    label?: ReactNode;
    placeholder?: string;
    name?: string;
    error?: boolean;
    helperText?: ReactNode;
    delay?: number;
}

const useStyles = makeStyles(() =>
    createStyles({
        autocomplete: {
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
            }
        },
        textField: {
            color: 'red'
        },
        textInput: {
            height: '4rem',
            background: 'transparent',
            border: '1px solid var(--cor-borda-campos)',
            borderRadius: '0.8rem',
            padding: '0',
            '& input': {
                marginRight: '4rem',
                color: 'var(--cor-texto-escuro)',
                font: '400 1.7rem Roboto',
                '&::placeholder': {
                    opacity: '1',
                    color: 'var(--cor-texto-claro)'
                }
            },
            '& .MuiAutocomplete-endAdornment': {
                top: 'unset',
                right: '7px'
            }
        },
        circularProgress: {
            position: 'relative',
            right: '5rem',
            alignSelf: 'center'
        }
    })
);

export default function AsyncAutocomplete<T> (props: AsyncAutocompleteProps<T>) {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [debouncedInputValue] = useDebounce(inputValue, props.delay || 500);

    const getOptions = useAsync(
        () => props.getOptions(debouncedInputValue), [debouncedInputValue]
    );

    const handleInputChange = (_event: React.ChangeEvent<unknown>, value: string) => {
        setInputValue(value);
    };

    return (
        <Autocomplete
            className={classes.autocomplete}
            filterOptions={options => options}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={getOptions.result || []}
            getOptionLabel={props.getOptionLabel}
            getOptionSelected={props.getOptionSelected}
            loading={getOptions.loading}
            clearText="Apagar"
            loadingText="Carregando..."
            noOptionsText="Nenhum hospital encontrado"
            fullWidth
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={props.name}
                    label={props.label}
                    placeholder={props.placeholder}
                    className={classes.textField}
                    error={props.error}
                    helperText={props.helperText}
                    variant='outlined'
                    InputProps={{
                        ...params.InputProps,
                        className: classes.textInput,
                        endAdornment: (
                            <>
                                {getOptions.loading &&
                                    <CircularProgress className={classes.circularProgress} color="inherit" size={20} />}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
}
