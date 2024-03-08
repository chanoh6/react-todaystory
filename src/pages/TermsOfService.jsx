import React from 'react';
import { Service, ServiceEn } from 'components';

function TermsOfService() {
  return <>{process.env.REACT_APP_LOCALE === 'en' ? <ServiceEn /> : <Service />}</>;
}

export default TermsOfService;
