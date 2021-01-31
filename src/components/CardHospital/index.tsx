import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";
import iconeAmbulancia from "../../assets/images/icones/tipoplantao/ambulancia.svg";
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import ModalInfoHospital from '../ModalInfoHospital';

interface InterfaceCardHospital {
    nomeHospital: string;
    tipoHospital: number;
    notaHospital: number;
    mediaSalarialHospital: number;
}

function CardHospital ({nomeHospital, tipoHospital, notaHospital, mediaSalarialHospital}: InterfaceCardHospital) {
    const [iconeHospital, setIconeHospital] = useState('');
    const [modalInfoCardAberto, setModalInfoCardAberto] = useState(false);
    const refInfoCardHospital = useRef<HTMLElement>(null);

    useEffect(() => {
        switch (tipoHospital) {
            case 1:
                setIconeHospital(iconeDptoEmergencia);
                break;
            case 2:
                setIconeHospital(iconePacientesInternados);
                break;
            case 3:
                setIconeHospital(iconeTransporteInterhospitalar);
                break;
            case 4:
                setIconeHospital(iconeAmbulancia);
                break;
            default:
                break;
        }
        
    }, [tipoHospital]);

    useEffect(() => {
        if (modalInfoCardAberto) {
            const { current: descriptionElement } = refInfoCardHospital;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [modalInfoCardAberto])
    
    return (
        <div className="cardhospital">
            <div className="partesuperior">
                <h5>{nomeHospital}</h5>
                <button onClick={() => {setModalInfoCardAberto(true)}}>Mostrar mais +</button>
            </div>
            <div className="parteinferior">
                <img src={iconeHospital} alt={nomeHospital}/>
                <div className="dadoshospital">
                    <div className="nota">
                        <p className="descricao">Nota</p>
                        <p className="valor">{notaHospital}/5</p>
                    </div>
                    <div className="mediasalarial">
                        <p className="descricao">Média Salarial</p>
                        <p className="valor">R$ {mediaSalarialHospital}/12H</p>
                    </div>
                </div>
            </div>
            <Dialog
                open={modalInfoCardAberto}
                onClose={() => {setModalInfoCardAberto(false)}}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    maxWidth: '1080px',
                    width: '60%',
                    outline: '0'
                },
                }}
            >
                <DialogContent style={{padding: '10rem 0 0 0'}}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={refInfoCardHospital}
                        tabIndex={-1}
                        style={{outline: 'none'}}
                    >
                        <ModalInfoHospital />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CardHospital;