import './Breadcrumbs.css';

/**
 * WPMN Design System — Breadcrumbs
 * Figma source: node 482-46694
 *
 * Icons: @hugeicons/react-pro (solid.rounded) — inlined as SVG so no bundler needed.
 * Using currentColor means light/dark theme is handled automatically via CSS color —
 * no need for separate light/dark icon assets.
 *
 * Props:
 *   variant   'border' | 'flat' | 'transparent' | 'text'   default: 'border'
 *   items     array of { label, href, icon }
 *             - icon: true — renders the Home01 icon
 *             - href: string — makes the item a link; omit for active/current item
 *   className string
 */

/* ── Inline SVG icon components (HugeIcons Pro, solid.rounded) ── */

const _Home01 = ({ s, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.52393 1.99594C10.3598 1.52688 11.1341 1.25 12.0001 1.25C12.8662 1.25 13.6404 1.52688 14.4763 1.99594C15.2862 2.45043 16.2143 3.12145 17.3812 3.96522L17.3813 3.96525L18.8903 5.05633C19.8268 5.73347 20.5748 6.2743 21.139 6.77487C21.7216 7.29173 22.1574 7.807 22.4338 8.45513C22.7109 9.10469 22.7779 9.77045 22.7407 10.5381C22.7049 11.2789 22.5675 12.1726 22.3962 13.2871L22.0809 15.3387C21.8376 16.9225 21.6438 18.1837 21.3591 19.1662C21.0647 20.1821 20.65 20.9887 19.9087 21.6052C19.1706 22.2192 18.2912 22.4926 17.2171 22.6231C16.1721 22.75 14.854 22.75 13.189 22.75H10.8112C9.14627 22.75 7.82812 22.75 6.78318 22.6231C5.70903 22.4926 4.8297 22.2192 4.09153 21.6052C3.35028 20.9887 2.93556 20.1821 2.64117 19.1662C2.35647 18.1836 2.16268 16.9225 1.91931 15.3387L1.60405 13.2872C1.43276 12.1727 1.2954 11.2789 1.25953 10.5381C1.22237 9.77045 1.28938 9.10469 1.56642 8.45513C1.84286 7.807 2.27867 7.29173 2.86121 6.77487C3.42541 6.27429 4.17342 5.73346 5.10996 5.05632L6.61899 3.96524C7.78599 3.12145 8.71402 2.45043 9.52393 1.99594ZM9.61442 16.2109C9.17861 15.8717 8.5503 15.95 8.21106 16.3858C7.87182 16.8216 7.9501 17.4499 8.38591 17.7892C9.36419 18.5507 10.6315 19 12.0002 19C13.3689 19 14.6361 18.5507 15.6144 17.7892C16.0502 17.4499 16.1285 16.8216 15.7893 16.3858C15.45 15.95 14.8217 15.8717 14.3859 16.2109C13.7651 16.6942 12.9319 17 12.0002 17C11.0684 17 10.2352 16.6942 9.61442 16.2109Z" fill={c} fillRule="evenodd" />
  </svg>
);

const _ArrowRight01 = ({ s, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.19486 5.40705C8.52237 4.96235 9.14837 4.86736 9.59306 5.19488C9.93847 5.44927 10.2668 5.70372 10.5528 5.92689C11.1236 6.3724 11.8882 6.98573 12.6556 7.65208C13.4181 8.31412 14.2064 9.04815 14.8119 9.73344C15.1136 10.0749 15.3911 10.4279 15.5986 10.7721C15.7895 11.0888 16 11.524 16 12.0001C16 12.4762 15.7895 12.9115 15.5986 13.2282C15.3911 13.5724 15.1136 13.9253 14.8119 14.2668C14.2064 14.9521 13.4181 15.6861 12.6556 16.3482C11.8882 17.0145 11.1236 17.6278 10.5528 18.0734C10.2668 18.2965 9.93847 18.551 9.59307 18.8054C9.14837 19.1329 8.52237 19.0379 8.19486 18.5932C8.0632 18.4144 7.99983 18.2064 8.00001 18.0002L8 12.0001L8 6.00007C7.99983 5.79387 8.0632 5.58581 8.19486 5.40705Z" fill={c} />
  </svg>
);

const DEFAULT_ITEMS = [
  { icon: true, href: '#' },
  { label: 'Label', href: '#' },
  { label: 'Label', href: '#' },
  { label: 'Label' },
];

const Breadcrumbs = ({
  variant   = 'border',
  items     = DEFAULT_ITEMS,
  className = '',
  ...rest
}) => (
  <nav
    className={['wpmn-breadcrumbs', 'wpmn-breadcrumbs--' + variant, className].filter(Boolean).join(' ')}
    aria-label="Breadcrumb"
    {...rest}
  >
    <ol className="wpmn-breadcrumbs__list">
      {items.map(({ label, href, icon }, i) => (
        <li key={i} className="wpmn-breadcrumbs__list-item">

          {href ? (
            <a
              href={href}
              className={'wpmn-breadcrumbs__item' + (icon ? ' wpmn-breadcrumbs__item--icon' : '')}
            >
              {icon && (
                <span className="wpmn-breadcrumbs__item-icon" aria-hidden="true">
                  <_Home01 s={18} c="currentColor" />
                </span>
              )}
              {label && <span>{label}</span>}
            </a>
          ) : (
            <span className="wpmn-breadcrumbs__item wpmn-breadcrumbs__item--active" aria-current="page">
              {icon && (
                <span className="wpmn-breadcrumbs__item-icon" aria-hidden="true">
                  <_Home01 s={18} c="currentColor" />
                </span>
              )}
              {label && <span>{label}</span>}
            </span>
          )}

          {i < items.length - 1 && (
            <span className="wpmn-breadcrumbs__sep" aria-hidden="true">
              <_ArrowRight01 s={12} c="currentColor" />
            </span>
          )}

        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
