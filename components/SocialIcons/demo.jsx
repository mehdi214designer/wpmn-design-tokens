/* WPMN Library demo — SocialIcons. Default, large, and subset. Uses window.DS. */
const Demo = () => (
  <div style={{display:'flex',flexDirection:'column',gap:32,maxWidth:420}}>
    <div>
      <div style={{fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>All icons — default size (32px)</div>
      <window.DS.SocialIcons />
    </div>
    <div>
      <div style={{fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>Large (48px)</div>
      <window.DS.SocialIcons size={48} />
    </div>
    <div>
      <div style={{fontSize:11,fontWeight:700,color:'var(--color-text-secondary)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>Subset</div>
      <window.DS.SocialIcons links={[{icon:'facebook',href:'#',label:'Facebook'},{icon:'x',href:'#',label:'X'},{icon:'linkedin',href:'#',label:'LinkedIn'}]} />
    </div>
  </div>
);
