import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

import { Dialog } from '@material-ui/core';
import ModalInfoHospital from '../ModalInfoHospital';
import { Hospital } from '../../pages/plantoes';

export interface InterfaceCardHospital {
    hospital: Hospital;
    blurBackground: (e: boolean) => void;
}

function CardHospital ({ hospital, blurBackground }: InterfaceCardHospital) {
    const [nomeHospitalCard, setNomeHospitalCard] = useState(hospital.nome);
    const [modalInfoCardAberto, setModalInfoCardAberto] = useState(false);
    const refInfoCardHospital = useRef<HTMLElement>(null);

    useEffect(() => {
        if (modalInfoCardAberto) {
            const { current: descriptionElement } = refInfoCardHospital;

            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
        blurBackground(modalInfoCardAberto);
    }, [modalInfoCardAberto]);

    useEffect(() => {
        if (nomeHospitalCard.length > 40) {
            let nome = nomeHospitalCard;

            while (nome.length > 40) {
                nome = nome.substring(0, nome.lastIndexOf(' '));
            }
            nome = nome.concat(' ...');
            setNomeHospitalCard(nome);
        }
    }, [nomeHospitalCard]);

    return (
        <div className="cardhospital">
            <div className="partesuperior">
                <h5>{nomeHospitalCard}</h5>
                <button onClick={() => { setModalInfoCardAberto(true); }}>Mostrar mais +</button>
            </div>
            <div className="parteinferior">
                <img src={hospital.icone} alt={hospital.nome}/>
                <div className="dadoshospital">
                    <div className="nota">
                        <p className="descricao">Nota</p>
                        <p className="valor">{hospital.nota}/5</p>
                    </div>
                    <div className="mediasalarial">
                        <p className="descricao">Média Salarial</p>
                        <p className="valor">R$ {hospital.media_salarial}/12H</p>
                    </div>
                </div>
            </div>
            <Dialog
                open={modalInfoCardAberto}
                onClose={() => { setModalInfoCardAberto(false); }}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        maxWidth: '1080px',
                        minWidth: '720px',
                        width: '57vw',
                        marginLeft: '22%',
                        marginTop: '11rem',
                        outline: '0',
                        boxShadow: 'none'
                    }
                }}
            >
                <ModalInfoHospital
                    hospital={hospital}
                    blurBackground={blurBackground}
                />
            </Dialog>
        </div>
    );
}

export default CardHospital;
