import React from 'react'
import { Input } from '../TicketForm/Input';
import newsletterStyles from './Newsletter.module.css';
import layoutStyles from '../Layout/Layout.module.css';
import { Sky } from '../404/Sky';

export const Newsletter = () => {
    return (
        <div className={`${layoutStyles.bg404Pattern} ${newsletterStyles.container}`}>
            <Sky stars={2}/>
            <h4 className={newsletterStyles.header}>Suscríbete a nuestro newsletter</h4>
            <span className={newsletterStyles.subheading}>Recibe notificaciones de nuestras últimas actualizaciones, blogs, posiciones, ofertas.</span>
            <Input
                newsletter
                handleChange={() => {}}
                id={'test'}
                value={''}
                textInputAsKey={'test'}
                friendlyName={'test'}
                placeholder={'E-mail'}
                type={'text'}
                extraStyling={'ml-0 w-40'}
                error={undefined}
            />
            <span className={newsletterStyles.copy}>Testeando este texto para ver que tan largo hay que hacerlo.</span>
        </div>
    )
}
