import { Policy, PolicyEn } from 'components';

const PrivacyPolicy = () => {
  return <>{process.env.REACT_APP_LOCALE === 'en' ? <PolicyEn /> : <Policy />}</>;
};

export default PrivacyPolicy;
