import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='mention-legale'>
                <div className='title'>
                    <h4>Mentions légales</h4>
                </div>
                <div className='link-area'>
                    <Link to = "/mention-legal">Mentions légales</Link>
                </div>
            </div>
            <div className='horaire-douverture'>
                <div className='title'>
                    <h4>Horaires d'ouverture</h4>
                </div>
                <p>Tchat ouvert 7j / 7 Lundi / Jeudi : 8h00 à 00h00 Mardi / Mercredi et Dimanche : 8h00 à 00h30 Samedi : 8h00 à 23h00</p>
            </div>
            <div className='service-client'>
                <div className='title'>
                    <h4>Service Client</h4>
                </div>
                <span>Pour tous renseignements</span>
                <span>info@voyance-en-direct.tv</span>
            </div>
        </div>
    </footer>
)
}

export default Footer