import React from 'react';

const Header = ({children}) => {
    return (
        <header role="banner" aria-label="Cabecera de sitio">
            <div className="top-bar">
                <div className="region region-top-bar">
                    <div id="block-subsite-branding" className="clearfix block block-system block-system-branding-block">


                        <a href="https://www.ugr.es" title="Universidad de Granada" className="site-logo logo-ugr logoSVG">
                            <img src="public/logo-mono.svg" alt="Universidad de Granada" />
                        </a>



                        <div className="site-name">
                            <a href="/" title="Home" className="site-logo logo-text">
                                <img src="public/logo-color-feetce.jpg" alt="Facultad de Educación, Economía y Tecnología de Ceuta"/>
                                    <div className="name">FACULTAD DE <br/>EDUCACIÓN, ECONOMÍA <br/>Y TECNOLOGÍA DE CEUTA</div>
                                    </a>
                                    </div>

                                </div>

                        </div>

                    </div>
                    <div className="site-header">
                        <div className="region region-secondary-menu">
                            <nav role="navigation" aria-labelledby="block-ugr-main-menu-menu" id="block-ugr-main-menu"
                                className="block block-menu navigation menu--main">
                                <ul className="clearfix menu">
                                    <li className="menu-item menu-item--expanded">

                                        <a href="/" aria-expanded="false" aria-haspopup="true">Facultad</a>


                                        <ul className="menu restricted-container">
                                            <li className="menu-item">

                                                <a href="/facultad/presentacion">Presentación</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/facultad/organizacion">Organización</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/facultad/directorio-personal">Directorio de personal</a>

                                            </li>
                                            <li className="menu-item">

                                            div                         <a href="/facultad/contacto">Localización y contacto</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/facultad/documentos">Documentos</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/facultad/actividades">Actividades</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="https://feetce.ugr.es/facultad/estrategia-calidad">Estrategia y Calidad</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/facultad/noticias">Noticias</a>

                                            </li>
                                        </ul>

                                    </li>
                                    <li className="menu-item menu-item--expanded">

                                        <a href="/" aria-expanded="false" aria-haspopup="true">Docencia</a>


                                        <ul className="menu restricted-container">
                                            <li className="menu-item">

                                                <a href="/docencia/grados">Grados</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/docencia/posgrados">Posgrados</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/docencia/profesorado">Profesorado</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/docencia/departamentos">Departamentos</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/docencia/trabajo-fin-grado">Trabajo Fin de Grado</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/docencia/practicas-externas">Prácticas Académicas Externas</a>

                                            </li>
                                        </ul>

                                    </li>
                                    <li className="menu-item menu-item--expanded">

                                        <a href="/" aria-expanded="false" aria-haspopup="true">Estudiantes</a>


                                        <ul className="menu restricted-container">
                                            <li className="menu-item">

                                                <a href="/estudiantes/estudia-en-ceuta">Estudia en Ceuta</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/estudiantes/delegacion">Delegación de Estudiantes</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/estudiantes/inclusion">Inclusión</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/estudiantes/extension">Extensión Universitaria</a>

                                            </li>
                                        </ul>

                                    </li>
                                    <li className="menu-item menu-item--expanded">

                                        <a href="/" aria-expanded="false" aria-haspopup="true">Movilidad</a>


                                        <ul className="menu item-right restricted-container">
                                            <li className="menu-item">

                                                <a href="/movilidad/estudiantes-incoming">Estudiantes incoming</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/movilidad/estudiantes-outgoing">Estudiantes outgoing</a>

                                            </li>
                                            <li className="menu-item">

                                                <a href="/movilidad/estrategia-internacionalizacion">Estrategia de internacionalización</a>

                                            </li>
                                        </ul>

                                    </li>
                                </ul>



                            </nav>

                        </div>

                        <div className="region region-header">
                            {children}
                        </div>
                    </div>
        </header>

    );
};

export default Header;
