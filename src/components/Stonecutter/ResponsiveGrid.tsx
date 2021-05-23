import React, { useEffect, useLayoutEffect, useState } from 'react';
import measureItems from './higher-order-components/measureItems';
import SpringGrid from './SpringGrid';

const enquire = typeof window !== 'undefined' ? require('enquire.js') : null;

interface ResponsiveGridInterface {
    options: {
        maxWidth: number;
        minPadding: number;
        defaultColumns: number;
        widthCoef: number;
        defaultcolumnWidth: number;
        defaultGutterWidth: number;
    }
    children: Array<number>;
}

interface BreakpointsInterface {
    breakpoint: string;
    handler: () => unknown;
}

const ResponsiveGrid: React.FC<ResponsiveGridInterface> = (props: ResponsiveGridInterface) => {
    const {
        options: {
            maxWidth,
            minPadding,
            defaultColumns,
            widthCoef,
            defaultcolumnWidth,
            defaultGutterWidth
        },
        children
    } = props;
    const Grid = measureItems(SpringGrid);

    const gutterWidth = defaultGutterWidth;
    const [columnWidth, setColumnWidth] = useState(defaultcolumnWidth);
    const [columns, setColumns] = useState(defaultColumns);
    const [breakpoints, setBreakpoints] = useState<BreakpointsInterface[]>();

    useEffect(() => {
        definirBreakpoints();
    }, []);

    function getWidth (i: number) {
        return widthCoef * (i * (columnWidth + gutterWidth) - gutterWidth + minPadding);
    }

    function setWidth (breakpoint: string, i: number) {
        setColumns(i + 1);
    }

    function definirBreakpoints () {
        const definirBreakpoints = [];

        for (let i = 2; getWidth(i) <= maxWidth + columnWidth + gutterWidth; i++) {
            definirBreakpoints.push(getWidth(i));
        }

        setBreakpoints(
            definirBreakpoints.map((width, i, arr) =>
                [
                    'screen',
                    i > 0 && `(min-width: ${arr[i - 1]}px)`,
                    i < arr.length - 1 && `(max-width: ${width}px)`
                ]
                    .filter(Boolean)
                    .join(' and '))
                .map((breakpoint, i) => ({
                    breakpoint,
                    handler: () => setWidth(breakpoint, i)
                }))
        );
    }

    useEffect(() => {
        breakpoints?.forEach(({ breakpoint, handler }) =>
            enquire.register(breakpoint, { match: handler }));
    }, [breakpoints]);

    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize () {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const largura = document.getElementById('grade')?.offsetWidth;
        const larguraInterna = defaultcolumnWidth + (defaultcolumnWidth + defaultGutterWidth) * (columns - 1);

        if (largura !== undefined) {
            setColumnWidth(defaultcolumnWidth + (largura - larguraInterna) / columns);
        }
    }, [size]);

    return (
        <Grid
            component="ul"
            itemHeight={300}
            columns={columns}
            columnWidth={columnWidth}
            gutterWidth={gutterWidth}
            gutterHeight={5}
            springConfig={{ stiffness: 170, damping: 26 }}
        >
            {children.map(item => {
                return (
                    <li className="grid-item" key={item} style={{ width: columnWidth + 'px' }}>
                        <h3>Qualquer merda</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Architecto vitae voluptatibus provident iure, nisi esse
                            atque rerum labore soluta facilis a commodi quod voluptatem
                            corporis quae facere optio dolorum tenetur.
                            lo
                        </p>
                        <p>Acabou aqui</p>
                    </li>
                );
            })}
        </Grid>
    );
};

export default ResponsiveGrid;
