/* WPMN Library demo — Input. Stroke + fill x sizes x states. Uses window.DS. */
const Demo = () => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:24}}>
    <window.DS.Input variant="stroke" size="lg" label="Stroke LG" placeholder="56px" />
    <window.DS.Input variant="stroke" size="md" label="Stroke MD" placeholder="48px" />
    <window.DS.Input variant="stroke" size="sm" label="Stroke SM" placeholder="40px" />
    <window.DS.Input variant="stroke" size="md" label="Error" error="Required field" />
    <window.DS.Input variant="stroke" size="md" label="Success" success="Looks good!" />
    <window.DS.Input variant="stroke" size="md" label="Disabled" placeholder="Not editable" disabled />
    <window.DS.Input variant="fill" size="md" label="Fill Default" placeholder="Type…" />
    <window.DS.Input variant="fill" size="md" label="Fill Error" error="Fix this" />
    <window.DS.Input variant="fill" size="md" label="Fill Success" success="Nice!" />
    <window.DS.Input variant="fill" size="md" label="Fill Disabled" placeholder="Not editable" disabled />
  </div>
);
