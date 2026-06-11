/* WPMN Library demo — Icons. Every icon in the HugeIcons reference map, with names. Uses window.DS. */
const Demo = () => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16,color:'var(--color-text-primary)'}}>
    {Object.entries(window.DS.Icons || {}).map(([name, Icon]) => (
      <div key={name} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',border:'1px solid var(--color-border-primary)',borderRadius:8}}>
        <Icon size={22} />
        <span style={{fontSize:12,color:'var(--color-text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name.replace(/Icon$/,'')}</span>
      </div>
    ))}
  </div>
);
