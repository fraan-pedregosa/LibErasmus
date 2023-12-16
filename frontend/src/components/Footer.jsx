import React from 'react';

const Footer = () => {
  return (
    <div className="margenFooter">
      <footer className="site-footer" role="complementary">
        <div className="footer-content">
          <div className="region region-content-bottom">
            <div id="block-marcadelsitio" className="clearfix block block-system block-system-branding-block">
              <div className="universidad">
                <a href="https://www.ugr.es" title="Universidad de Granada" className="site-logo logoSVG">
                  <img src="public/logo-footer.svg" alt="Universidad de Granada" />
                </a>
                <div className="site-name">
                  <a href="/" title="Home" rel="home">Facultad de Educación, Economía y Tecnología de Ceuta</a>
                </div>
                <a href="https://www.arqus-alliance.eu/" title="Arqus alliance" className="arqus-logo logoSVG">
                  <img src="public/arqus-alliance.svg" alt="Logo Arqus alliance" />
                </a>
              </div>
            </div>
            <div id="block-logosfooter" className="block block-ugr-general block-logos-footer-block">
              <div className="logos-footer-block">
                <div className="logos-footer">
                  <a href="http://www.universia.es/" title="Universia" className="excelencia-logo logoSVG">
                    <img src="public/universia.svg" alt="Logo Universia" />
                  </a>
                  <a href="https://investigacion.ugr.es/pages/hrs4r"
                    title="Human Resources Strategy for Researchers" className="excelencia-logo logoSVG">
                    <img src="public/excelencia.svg" alt="Human Resources Strategy for Researchers" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="region region-footer-submenu">
          <div className="views-element-container block block-views block-views-blocklogos-footer-block-2"
            id="block-views-block-logos-footer-block-2">
            <div>
              <div
                className="view view-logos-footer view-id-logos_footer view-display-id-block_2 js-view-dom-id-58756690da89922fe3e397036bbf26b724b9db7136887812028113cc218f6784">
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="site-footer" role="contentinfo" >
        <div className="region region-footer-info">
          <nav role="navigation" aria-labelledby="block-footersubmenu-menu" id="block-footersubmenu"
            className="block block-menu navigation menu--footer-submenu">
            <h2 className="visually-hidden" id="block-footersubmenu-menu">Liberasmus</h2>
            <p className="parrafoFooter">WORK IN PROGRESS...</p>
          </nav>
          <div id="block-copyrightblock" className="block block-ugr-general block-copyright-block">
            <div className="copyright-block">© 2023 Universidad de Granada</div>
          </div>
        </div>
      </footer>
      <div className="back-to-top"></div>
    </div>
  );
};

export default Footer;
