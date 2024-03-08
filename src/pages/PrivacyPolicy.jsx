import React from 'react';
import { Policy, PolicyEn } from 'components';

function PrivacyPolicy() {
  return <>{process.env.REACT_APP_LOCALE === 'en' ? <PolicyEn /> : <Policy />}</>;
}

export default PrivacyPolicy;
