import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';

import SendIcon from '@material-ui/icons/Send';

interface TextFormProps {
    placeholder: string;
    onSubmit: (text: string) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            background: 'transparent',
            // border: '1px solid var(--cor-borda-campos)',
            borderRadius: '0.8rem',
            padding: '1.2rem 1.3rem',
            width: '100%',
            outline: 'none',
            overflow: 'hidden',
            font: '400 1.7rem SFProText',
            color: 'var(--cor-texto-claro)',
            '& textarea': {
                outline: 'none',
                width: '100%',
                resize: 'none',
                font: '400 1.2rem SFProText',
                background: 'transparent',
                border: 'none'
            }
        },
        sendButton: {
            margin: '-1rem',
            transition: '0.4s',
            right: '-5rem'
        },
        sendButtonActive: {
            right: '0'
        }
    })
);

function TextForm (props: TextFormProps) {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            comentario: ''
        },
        validationSchema: Yup.object({
            comentario: Yup.string().required()
        }),
        onSubmit: (values) => {
            formik.resetForm();
            props.onSubmit(values.comentario);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
                <OutlinedInput
                    className={classes.root}
                    endAdornment={
                        <IconButton
                            className={`${classes.sendButton} ${formik.values.comentario.length > 0 &&
                                classes.sendButtonActive}`}
                            type="submit"
                        >
                            <SendIcon fontSize="large"/>
                        </IconButton>
                    }
                    name="comentario"
                    value={formik.values.comentario}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                    placeholder={props.placeholder}
                />
            </FormControl>
        </form>
    );
}

export default TextForm;
