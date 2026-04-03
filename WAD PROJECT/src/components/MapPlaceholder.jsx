export default function MapPlaceholder() {
  return (
    <div style={{
      width: '100%',
      height: '180px',
      backgroundColor: '#e6e2d8',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'var(--accent-brown)',
      marginTop: '16px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
    }}>
      <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🗺️</span>
      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Map Preview Unavaialble</span>
      <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>(Feature simulated)</span>
    </div>
  );
}
