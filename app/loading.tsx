'use client';

export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div className="spinner" />
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #ccc;
          border-top-color: #0070f3;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
