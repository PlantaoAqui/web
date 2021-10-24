import { SvgIcon } from '@material-ui/core';
import React from 'react';

type FontSize = {
    size?: 'large' | 'small';
};

function IconeEstrela({ size }: FontSize) {
    return (
        <SvgIcon fontSize={size} viewBox="0 0 14 13">
            <path d="M3.50946 12.4121C3.63446 12.5059 3.77411 12.5391 3.92841 12.5117C4.0827
                12.4844 4.24969 12.4043 4.42938 12.2715L7.32977 10.1387L10.236 12.2715C10.4196
                12.4043 10.5886 12.4844 10.7429 12.5117C10.8972 12.5391 11.0349 12.5059 11.1559
                12.4121C11.277 12.3184 11.3513 12.1953 11.3786 12.043C11.4059 11.8906 11.3845
                11.709 11.3141 11.498L10.1657 8.08203L13.0954 5.98438C13.2751 5.85156 13.4011
                5.71582 13.4733 5.57715C13.5456 5.43848 13.5563 5.29688 13.5056 5.15234C13.4587
                5.00781 13.3649 4.89941 13.2243 4.82715C13.0837 4.75488 12.904 4.7207 12.6852
                4.72461L9.08759 4.74805L7.99774 1.31445C7.92743 1.09961 7.83759 0.9375 7.72821
                0.828125C7.61884 0.71875 7.48602 0.664062 7.32977 0.664062C7.17743 0.664062 7.04657
                0.71875 6.93719 0.828125C6.82782 0.9375 6.73798 1.09961 6.66766 1.31445L5.57782
                4.74805L1.98602 4.72461C1.76337 4.7207 1.5827 4.75488 1.44403 4.82715C1.30536
                4.89941 1.21063 5.00586 1.15985 5.14648C1.10907 5.29492 1.12079 5.43848 1.19501
                5.57715C1.26923 5.71582 1.39618 5.85156 1.57587 5.98438L4.50555 8.08203L3.35712
                11.498C3.2868 11.709 3.26434 11.8906 3.28973 12.043C3.31512 12.1953 3.38837
                12.3184 3.50946 12.4121Z" fillOpacity={0} stroke="#707070" strokeWidth="0.5"
            />
        </SvgIcon>
    );
}

export default IconeEstrela;
