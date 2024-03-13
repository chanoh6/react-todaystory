import { Service, ServiceEn } from 'components';

const TermsOfService = () => {
  return <>{process.env.REACT_APP_LOCALE === 'en' ? <ServiceEn /> : <Service />}</>;
};

export default TermsOfService;
