/* WPMN Library demo — Breadcrumbs. All 4 style variants. Uses window.DS. */
const Demo = () => {
  const ITEMS = [
    { icon: true, href: '#' },
    { label: 'Label', href: '#' },
    { label: 'Label', href: '#' },
    { label: 'Label' },
  ];
  const rowStyle = { display:'flex', flexDirection:'column', gap:8, marginBottom:24 };
  const labelStyle = { fontSize:11, fontWeight:700, color:'var(--color-text-secondary)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 };
  return (
    <div>
      {['border','flat','transparent','text'].map(v => (
        <div key={v} style={rowStyle}>
          <div style={labelStyle}>{v}</div>
          <window.DS.Breadcrumbs variant={v} items={ITEMS} />
        </div>
      ))}
    </div>
  );
};
