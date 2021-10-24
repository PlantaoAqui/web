import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StarRating from '../../StarRating';
import Typography from '@material-ui/core/Typography';

type LinhaReviewProps = {
    legenda: string;
    nota: number;
};

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(3)
        },
        infoHospitalDupla: {
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(3),
            alignContent: 'flex-start'
        }
    })
);

function LinhaReview({ legenda, nota }: LinhaReviewProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography color="textPrimary"
                variant="body1"
            >
                {legenda}
            </Typography>
            <div className={classes.infoHospitalDupla}>
                <Typography color="textPrimary"
                    variant="body1"
                >
                    {nota.toFixed(1)}
                </Typography>
                <StarRating value={nota} readonly/>
            </div>
        </div>
    );
}

export default LinhaReview;
