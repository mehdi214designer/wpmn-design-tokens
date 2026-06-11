/* WPMN Library demo — NavBar. Desktop layout with active link + CTA. Uses window.DS. */
const Demo = () => (
  <window.DS.NavBar
    logo={window.DS.Logo ? <window.DS.Logo brand="wpmanagenia" variant="logo" type="primary" height={24} /> : <strong>WPMN</strong>}
    links={[{label:'Products',href:'#',active:true},{label:'Pricing',href:'#'},{label:'Docs',href:'#'}]}
    ctaLabel="Get Started"
  />
);
