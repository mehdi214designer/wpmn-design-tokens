/**
 * WPMN Design System — Component Demo
 *
 * Drop this into any React project (after importing index.css) to
 * verify all components render correctly with your token values.
 *
 * Usage:
 *   import '../wpmn-design-tokens/index.css';
 *   import Demo from '../wpmn-design-tokens/components/Demo';
 */

import React, { useState, useEffect } from 'react';
import '../index.css';
import { Button, Text, Input, Badge, NavBar, Logo, BRANDS } from './index';

const Section = ({ title, children, description }) => (
  <div style={{ marginBottom: 64 }}>
    <div style={{ marginBottom: 24, borderBottom: '1px solid var(--color-border-primary)', paddingBottom: 12 }}>
      <Text variant="h4" style={{ marginBottom: 4 }}>
        {title}
      </Text>
      {description && (
        <Text variant="body-small" color="secondary">
          {description}
        </Text>
      )}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

const ColorSwatch = ({ name, variable }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 120 }}>
    <div style={{
      height: 64,
      width: '100%',
      borderRadius: 'var(--radius-sm)',
      backgroundColor: `var(${variable})`,
      border: '1px solid var(--color-border-primary)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text variant="body-mono" style={{ fontSize: 10, fontWeight: 600 }}>{name}</Text>
      <Text variant="body-mono" color="secondary" style={{ fontSize: 9 }}>{variable}</Text>
    </div>
  </div>
);

export default function Demo() {
  const [inputValue, setInputValue] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={{
      padding: '40px 80px',
      backgroundColor: 'var(--color-surface-primary)',
      color: 'var(--color-text-primary)',
      minHeight: '100vh',
      fontFamily: 'var(--font-family-base)',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* ── NAVBAR ───────────────────────────────────────── */}
      <div style={{ margin: '-40px -80px 64px', borderBottom: '1px solid var(--color-border-primary)', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--color-surface-primary)' }}>
        <NavBar
          logo={
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <Logo brand="wpmanagenia" variant="icon" type={theme === 'dark' ? 'white' : 'primary'} height={32} />
               <Text variant="h6" style={{ margin: 0, fontWeight: 700 }}>WPMN Design</Text>
            </div>
          }
          links={[
            { label: 'Tokens',  href: '#tokens' },
            { label: 'Typography', href: '#typography' },
            { label: 'Components',   href: '#components' },
            { label: 'Logos',      href: '#logos' },
          ]}
          ctaLabel={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          ctaOnClick={toggleTheme}
        />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ marginBottom: 80 }}>
          <Text variant="h1" style={{ marginBottom: 16 }}>Design System Showcase</Text>
          <Text variant="body-large" color="secondary" style={{ maxWidth: 600 }}>
            A comprehensive overview of the WPMN design tokens, typography, and React components.
            Toggle the theme in the navigation bar to see the semantic mapping in action.
          </Text>
        </header>

        <div id="tokens">
          <Section title="Color Primitives — Primary & Accent" description="Raw base values used for brand consistency.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 24, width: '100%' }}>
              <ColorSwatch name="Primary 500" variable="--primitive-primary-500" />
              <ColorSwatch name="Primary 700" variable="--primitive-primary-700" />
              <ColorSwatch name="Accent 500" variable="--primitive-accent-500" />
              <ColorSwatch name="Accent 700" variable="--primitive-accent-700" />
              <ColorSwatch name="Dark 800" variable="--primitive-dark-800" />
              <ColorSwatch name="Light 100" variable="--primitive-light-100" />
            </div>
          </Section>

          <Section title="Semantic Tokens" description="Mapped variables that adapt to theme changes.">
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 24, width: '100%' }}>
              <ColorSwatch name="Surface Primary" variable="--color-surface-primary" />
              <ColorSwatch name="Text Primary" variable="--color-text-primary" />
              <ColorSwatch name="Text Secondary" variable="--color-text-secondary" />
              <ColorSwatch name="Border Primary" variable="--color-border-primary" />
              <ColorSwatch name="Success" variable="--color-success-primary" />
              <ColorSwatch name="Warning" variable="--color-warning-primary" />
              <ColorSwatch name="Error" variable="--color-error-primary" />
            </div>
          </Section>
        </div>

        <div id="typography">
          <Section title="Typography" description="Font styles for headings and body text.">
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 24, borderRadius: 12, backgroundColor: 'var(--input-fill-default)', border: '1px solid var(--color-border-primary)' }}>
                <Text variant="h1">Heading 1 — Work Sans Bold 61px</Text>
                <Text variant="h2">Heading 2 — Work Sans Bold 49px</Text>
                <Text variant="h3">Heading 3 — Work Sans SemiBold 39px</Text>
                <Text variant="h4">Heading 4 — Work Sans SemiBold 31px</Text>
                <Text variant="h5">Heading 5 — Work Sans Medium 25px</Text>
                <Text variant="h6">Heading 6 — Work Sans Medium 20px</Text>
              </div>
              <div style={{ padding: 24, borderRadius: 12, backgroundColor: 'var(--input-fill-default)', border: '1px solid var(--color-border-primary)' }}>
                <Text variant="body-large">Body Large — 20px desktop</Text>
                <Text variant="body-medium">Body Medium — 18px desktop</Text>
                <Text variant="body-base">Body Base — 16px desktop</Text>
                <Text variant="body-small">Body Small — 14px desktop</Text>
                <Text variant="body-label">Body Label — 13px (Medium weight)</Text>
                <Text variant="body-mono">Body Mono — 10px (Monospace)</Text>
              </div>
            </div>
          </Section>
        </div>

        <div id="components">
          <Section title="Buttons" description="Primary, Secondary, and Tertiary variants across multiple sizes.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Button type="primary" size="xl">Primary XL</Button>
                <Button type="primary" size="lg">Large</Button>
                <Button type="primary" size="md">Medium</Button>
                <Button type="primary" size="sm">Small</Button>
                <Button type="primary" size="xs">Extra Small</Button>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Button type="secondary" size="lg">Secondary Large</Button>
                <Button type="secondary" size="md">Medium</Button>
                <Button type="secondary" size="sm">Small</Button>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Button type="tertiary" size="md">Tertiary Medium</Button>
                <Button type="primary" size="md" loading>Loading State</Button>
                <Button type="primary" size="md" disabled>Disabled State</Button>
              </div>
            </div>
          </Section>

          <Section title="Inputs" description="Stroke and Fill variants with support for labels, hints, and validation states.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32, width: '100%' }}>
              <Input
                variant="stroke" size="md"
                label="Stroke Variant"
                placeholder="Enter text..."
                hint="This is the default input style."
              />
              <Input
                variant="fill" size="md"
                label="Fill Variant"
                placeholder="Search..."
              />
              <Input
                variant="stroke" size="md"
                label="Error State"
                value="Invalid input"
                error="Please enter a valid value."
              />
              <Input
                variant="stroke" size="md"
                label="Success State"
                value="valid_username"
                success="Looks good!"
              />
            </div>
          </Section>

          <Section title="Badges" description="Status indicators with optional dots.">
            <div style={{ display: 'flex', gap: 12 }}>
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="error"   dot>Failed</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Draft</Badge>
              <Badge variant="brand" size="lg">Large Brand Badge</Badge>
            </div>
          </Section>
        </div>

        <div id="logos">
          <Section title="Brand Logos" description="SVG logos for all WPMN ecosystem products.">
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 40 }}>
              {BRANDS.map(brand => (
                <div key={brand} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, padding: 20, borderRadius: 12, border: '1px solid var(--color-border-primary)' }}>
                  <Logo brand={brand} variant="logo" type={theme === 'dark' ? 'white' : 'primary'} height={32} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Logo brand={brand} variant="icon" type={theme === 'dark' ? 'white' : 'primary'} height={24} />
                    <Text variant="body-label" color="secondary">{brand}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <footer style={{ marginTop: 120, padding: 40, borderTop: '1px solid var(--color-border-primary)', textAlign: 'center' }}>
        <Text variant="body-small" color="secondary">
          WPMN Design System © 2026 • Built with Figma & React
        </Text>
      </footer>
    </div>
  );
}
