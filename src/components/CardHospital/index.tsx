import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

import iconeDptoEmergencia from "../../assets/images/icones/tipoplantao/dptoemergencia.svg";
import iconePacientesInternados from "../../assets/images/icones/tipoplantao/pacientesinternados.svg";
import iconeTransporteInterhospitalar from "../../assets/images/icones/tipoplantao/transporteinterhospitalar.svg";
import iconeAmbulancia from "../../assets/images/icones/tipoplantao/ambulancia.svg";
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import ModalInfoHospital from '../ModalInfoHospital';

export interface InterfaceCardHospital {
    idHospital: number;
    nomeHospital: string;
    tipoHospital: number;
    notaHospital: number;
    mediaSalarialHospital: number;
}

function CardHospital ({idHospital, nomeHospital, tipoHospital, notaHospital, mediaSalarialHospital}: InterfaceCardHospital) {
    const [nomeHospitalCard, setNomeHospitalCard] = useState(nomeHospital);
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
    }, [modalInfoCardAberto]);

    useEffect(() => {
        if (nomeHospitalCard.length > 40) {
            let nome = nomeHospitalCard;
            while (nome.length > 40) {
                nome = nome.substring(0, nome.lastIndexOf(" "));
            }
            nome = nome.concat(" ...");
            setNomeHospitalCard(nome);
        }
    }, [nomeHospitalCard]);

    return (
        <div className="cardhospital">
            <div className="partesuperior">
                <h5>{nomeHospitalCard}</h5>
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
                    minWidth: '720px',
                    width: '53vw',
                    marginLeft: '22%',
                    marginTop: '13rem',
                    outline: '0'
                },
                }}
            >
                <DialogContent style={{padding: '0'}}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={refInfoCardHospital}
                        tabIndex={-1}
                        style={{outline: 'none'}}
                    >
                        <ModalInfoHospital
                            idHospital={idHospital}
                            nomeHospital={nomeHospital}
                            tipoHospital={tipoHospital}
                            notaHospital={notaHospital}
                            mediaSalarialHospital={mediaSalarialHospital}
                        />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CardHospital;
