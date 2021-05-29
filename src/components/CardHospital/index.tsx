import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

import { Dialog } from '@material-ui/core';
import ModalInfoPlantao from '../ModalInfoPlantao';
import { Plantao } from '../../pages/plantoes';

export interface InterfaceCardPlantao {
    plantao: Plantao;
    blurBackground: (e: boolean) => void;
}

function CardHospital ({ plantao, blurBackground }: InterfaceCardPlantao) {
    const [nomeHospitalCard, setNomeHospitalCard] = useState(plantao.nome);
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
                <img src={plantao.icone} alt={plantao.nome}/>
                <div className="dadoshospital">
                    <div className="nota">
                        <p className="descricao">Nota</p>
                        <p className="valor">{plantao.nota}/5</p>
                    </div>
                    <div className="mediasalarial">
                        <p className="descricao">Média Salarial</p>
                        <p className="valor">R$ {plantao.media_salarial}/12H</p>
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
                <ModalInfoPlantao
                    plantao={plantao}
                    blurBackground={blurBackground}
                />
            </Dialog>
        </div>
    );
}

export default CardHospital;
