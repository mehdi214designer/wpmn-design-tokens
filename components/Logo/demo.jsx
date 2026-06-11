/* WPMN Library demo — Logo. 6 brands x 5 color types on matching surfaces. Uses window.DS. */
const Demo = () => (
  <div style={{display:'flex',flexDirection:'column',gap:24}}>
    {['wpmanagenia','fluentforms','fluentcrm','ninjatables','paymattic','fluentsupport'].map(brand=>(
      <div key={brand} style={{display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
        {['primary','dark','inverted','black','white'].map((type,i)=>{
          const bgs=['#fff','#07090c','var(--primitive-primary-500)','#fff','#07090c'];
          return(
            <div key={type} style={{background:bgs[i],borderRadius:10,padding:'12px 20px',border:'1px solid var(--color-border-primary)',display:'flex',alignItems:'center'}}>
              <window.DS.Logo brand={brand} variant="logo" type={type} height={20} />
            </div>
          );
        })}
      </div>
    ))}
  </div>
);
