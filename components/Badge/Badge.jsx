import './Badge.css';

/**
 * WPMN Design System — Badge
 * Figma source: "Badge ✅" (node 40:12056)
 *
 * Props:
 *   variant   'pill' | 'soft'
 *             pill → fully-rounded, compact  (border-radius: 100px, 20px text)
 *             soft → soft-rounded, large     (border-radius: 16px,  26px text)
 *   type      'in_progress' | 'completed' | 'experimental' | 'deprecated' | 'handoff_ready'
 *   className string  — extra classes
 *   children  node    — override label (optional; defaults to the type label)
 */

const TYPE_LABELS = {
  in_progress:   'IN PROGRESS',
  completed:     'COMPLETED',
  experimental:  'EXPERIMENTAL',
  deprecated:    'DEPRECATED',
  handoff_ready: 'HANDOFF READY',
};

const Badge = ({ variant='pill', type='in_progress', className='', children, ...rest }) => (
  <span
    className={['wpmn-badge', 'wpmn-badge--' + variant, 'wpmn-badge--' + type, className].filter(Boolean).join(' ')}
    {...rest}
  >
    {children !== undefined ? children : (TYPE_LABELS[type] || type)}
  </span>
);

export default Badge;
