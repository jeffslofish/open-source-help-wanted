import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuthRedirectHandler() {
  const navigate = useNavigate();
  const queryParamSearch = useLocation().search;

  useEffect(() => {
    (async function () {
      const oauthCode = new URLSearchParams(queryParamSearch).get('code');

      if (oauthCode) {
        localStorage.setItem('oauthCode', oauthCode);

        const response = await fetch(
          `/.netlify/functions/getAccessToken?oauthCode=${oauthCode}`
        );

        if (response.ok) {
          const accessToken = await response.text();
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            navigate('/');
          } else {
            throw new Error(`Failed to get access tokenfrom ${oauthCode}`);
          }
        } else {
          throw new Error(
            `Failed to get access token from ${oauthCode}. Invalid response: ${response.statusText}`
          );
        }
      }
    })();
  }, []);

  return <></>;
}

export default OAuthRedirectHandler;
