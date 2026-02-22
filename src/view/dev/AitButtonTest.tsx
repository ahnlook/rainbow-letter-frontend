import { useState } from 'react';
import { Button } from '@toss/tds-mobile';

function AitButtonTest() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <main style={{ padding: '24px', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
        AIT Button Test
      </h1>
      <p style={{ marginBottom: '20px', lineHeight: 1.5 }}>
        button click count: {clickCount}
      </p>
      <Button
        display="block"
        size="large"
        onClick={() => setClickCount((prev) => prev + 1)}
      >
        tds-mobile Button
      </Button>
    </main>
  );
}

export default AitButtonTest;
