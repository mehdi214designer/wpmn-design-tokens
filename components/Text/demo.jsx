/* WPMN Library demo — Text. Full type scale: 6 headings + 6 body variants. Uses window.DS. */
const Demo = () => (
  <div style={{display:'flex',flexDirection:'column',gap:8}}>
    {['h1','h2','h3','h4','h5','h6'].map(v=>(
      <window.DS.Text key={v} variant={v}>Heading {v.toUpperCase()} — Design System</window.DS.Text>
    ))}
    {['body-large','body-medium','body-base','body-small','body-label','body-mono'].map(v=>(
      <window.DS.Text key={v} variant={v}>Body {v} — The quick brown fox jumps over the lazy dog.</window.DS.Text>
    ))}
  </div>
);
