/* WPMN Library demo — Badge. Both variants x all 5 types + custom labels. Uses window.DS. */
const Demo = () => {
  const TYPES = ['in_progress','completed','experimental','deprecated','handoff_ready'];
  const rowStyle = { display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', marginBottom:20 };
  const labelStyle = { fontSize:11, fontWeight:700, color:'var(--color-text-secondary)', textTransform:'uppercase', letterSpacing:'0.06em', minWidth:44 };
  return (
    <div>
      <div style={rowStyle}>
        <span style={labelStyle}>Pill</span>
        {TYPES.map(t=><window.DS.Badge key={t} variant="pill" type={t} />)}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Soft</span>
        {TYPES.map(t=><window.DS.Badge key={t} variant="soft" type={t} />)}
      </div>
      <div style={{...rowStyle, marginTop:8, paddingTop:16, borderTop:'1px solid var(--color-border-primary)'}}>
        <span style={labelStyle}>Custom</span>
        <window.DS.Badge variant="pill" type="completed">✓ Shipped</window.DS.Badge>
        <window.DS.Badge variant="soft" type="in_progress">Shipping now</window.DS.Badge>
      </div>
    </div>
  );
};
