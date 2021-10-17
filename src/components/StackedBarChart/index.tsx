import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.grey[300],
            borderRadius: theme.spacing(2),
            padding: theme.spacing(3)
        },
        tituloCard: {
            borderBottom: '1px solid #B7B8BA',
            paddingBottom: theme.spacing(1),
            marginBottom: theme.spacing(2)
        }
    })
);

function StackedBarChart () {
    const classes = useStyles();

    const data: ChartData = {
        labels: [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H'
        ],
        datasets: [
            {
                label: 'Valor recebido',
                data: [7, 2, 6, 3, 6, 3, 4, 4],
                backgroundColor: '#A1E09E',
                barPercentage: 0.4
            },
            {
                label: 'Valor a receber',
                data: [1, 0, 4, 3, 2, 1, 2],
                backgroundColor: '#FCC077',
                barPercentage: 0.4
            }
        ]
    };

    const options: ChartOptions = {
        maintainAspectRatio: false,
        legend: {
            display: false,
            position: 'top',
            align: 'start',
            onClick: (e) => e.stopPropagation(),
            labels: {
                boxWidth: 0
            }
        },
        scales: {
            xAxes: [{
                position: 'bottom',
                gridLines: {
                    display: false
                },
                stacked: true,
                ticks: {
                    callback: function (value) {
                        if (typeof (value) === 'string') {
                            return value.charAt(0);
                        }
                    }
                }
            }],
            yAxes: [{
                position: 'right',
                gridLines: {
                    drawOnChartArea: false,
                    tickMarkLength: 5
                },
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    fontSize: 10,
                    stepSize: 3
                }
            }],
            gridLines: {
                drawTicks: false
            }
        },
        responsive: true
    };

    // const config = {
    //     type: 'bar',
    //     data: data,
    //     options: {
    //         plugins: {
    //             title: {
    //                 display: true,
    //                 text: 'Chart.js Bar Chart - Stacked'
    //             }
    //         },
    //         responsive: true,
    //         scales: {
    //             x: {
    //                 stacked: true
    //             },
    //             y: {
    //                 stacked: true
    //             }
    //         }
    //     }
    // };

    return (
        <div className={classes.root}>
            <Typography
                variant="body1" color="textSecondary"
            >
                Título do gráfico
            </Typography>
            <Bar
                data={data}
                options={options}
                width={230}
                height={150}
            />
        </div>
    );
}

export default StackedBarChart;
