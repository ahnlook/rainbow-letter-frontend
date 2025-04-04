import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { saveToken } from 'utils/localStorage';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      saveToken(token);
    }
    navigate('/');
  }, []);

  return null;
}
