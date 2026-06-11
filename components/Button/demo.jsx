/* WPMN Library demo — Button. All types x sizes + loading + disabled. Uses window.DS. */
const Demo = () => (
  <div style={{display:'flex',flexDirection:'column',gap:20}}>
    {[['Primary','primary'],['Secondary','secondary'],['Tertiary','tertiary']].map(([lbl,type])=>(
      <div key={type} style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
        <span style={{fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',textTransform:'uppercase',minWidth:72}}>{lbl}</span>
        {['xl','lg','md','sm','xs'].map(s=><window.DS.Button key={s} type={type} size={s}>{s.toUpperCase()}</window.DS.Button>)}
      </div>
    ))}
    <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
      <span style={{fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',textTransform:'uppercase',minWidth:72}}>Loading</span>
      {['xl','lg','md','sm','xs'].map(s=><window.DS.Button key={s} type="primary" size={s} loading>{s.toUpperCase()}</window.DS.Button>)}
    </div>
    <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
      <span style={{fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',textTransform:'uppercase',minWidth:72}}>Disabled</span>
      {['xl','lg','md','sm','xs'].map(s=><window.DS.Button key={s} type="primary" size={s} disabled>{s.toUpperCase()}</window.DS.Button>)}
    </div>
  </div>
);
